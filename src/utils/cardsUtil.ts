import Cryptr from "cryptr";
import { Cards } from "@prisma/client";

export function decryptPassword(card: Cards){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const decryptedPassword = cryptr.decrypt(card.password);
  const decryptedCard = {...card, password: decryptedPassword}
  return decryptedCard;
}

export function decryptAllPasswords(cards: Cards[]){
  const decryptedCards = cards.map((card: Cards) => {
   return decryptPassword(card)
  });
  return decryptedCards;
}