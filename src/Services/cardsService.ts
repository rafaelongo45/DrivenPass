import Cryptr from "cryptr";
import dotenv from "dotenv";
import { Cards } from "@prisma/client";

import * as cardRepository from "../Repositories/cardsRepository.js";
import { decryptAllPasswords, decryptPassword } from "../utils/cardsUtil.js";

dotenv.config();

async function findByUserIdAndTitle(userId: number, title: string){
  const card = await cardRepository.findByTitleAndId(userId, title);

  if(card){
    throw { type: "credentialError", message: "Card with this title for this user already exists", code: 409 };
  }
};

async function checkCard(card: Cards, userId: number){
  if(!card){
    throw { type: "cardError", message: "Card with this id does not exist", code: 404 };
  }

  const isCardFromUser = card.userId === userId;

  if(!isCardFromUser){
    throw { type: "cardError", message: "This card does not belong to this user", code: 401 };
  }
};

async function encryptData(data: Cards){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedPassword: string = cryptr.encrypt(data.password);
  const encryptedCVC: string = cryptr.encrypt(data.securityCode);

  const encryptedData = { ...data, password: encryptedPassword, securityCode: encryptedCVC};
  return encryptedData;
};

export async function insertCard(data: Cards){
  await findByUserIdAndTitle(data.userId, data.title);
  const encryptedData = await encryptData(data);
  await cardRepository.insert(encryptedData);
};

export async function findAllCards(userId: number){
  const cards = await cardRepository.findAllUserCards(userId);
  const decryptedCards = decryptAllPasswords(cards);
  return decryptedCards;
};

export async function findUserCard(userId: number, cardId: number){
  const card = await cardRepository.findSpecificCard(cardId);
  await checkCard(card, userId);
  const decryptedCard = decryptPassword(card);
  return decryptedCard;
};

export async function deleteCard(userId: number, cardId: number){
  const card = await cardRepository.findSpecificCard(cardId);
  await checkCard(card, userId);
  await cardRepository.deleteCardById(cardId);
};