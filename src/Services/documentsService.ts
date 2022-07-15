import { Documents } from "@prisma/client";
import * as documentsRepository from "../Repositories/documentsRepository.js";

async function checkDocument(document: Documents, userId: number){
  if(!document){
    throw { type: "documentError", message: "Document with this id doesn't exist", code: 404};
  }

  const belongsToUser = document.userId === userId;

  if(!belongsToUser){
    throw { type: "documentError", message: "This document does not belong to this user", code: 401 };
  }
}

async function hasDocument(data: Documents){
  const document = await documentsRepository.findByIdAndTitle(data.userId, data.type);

  if(document){
    throw { type: "documentError", message: "User already has document of this type", code: 409 };
  }
};

export async function insertDocument(data: Documents){
  await hasDocument(data);
  await documentsRepository.insert(data);
};

export async function findAllDocuments(userId: number){
  const documents = await documentsRepository.findAll(userId);
  return documents;
};

export async function findDocument(userId: number, documentId: number){
  const document = await documentsRepository.findOne(documentId);
  await checkDocument(document, userId);
  return document;
};

export async function deleteDocument(documentId: number, userId: number){
  const document = await documentsRepository.findOne(documentId);
  await checkDocument(document, userId);
  await documentsRepository.deleteDocument(documentId);
}