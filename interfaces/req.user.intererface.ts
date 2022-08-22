/* source: https://app.betrybe.com/course/back-end/typescript/tipagem-estatica-e-generics/68eccf60-a982-4455-837d-da31e8726be5/conteudos/92d81f61-aeb5-4bb6-af7f-ee4563c35254/interfaces/e1518fcd-2908-44df-a5bf-6dcd6dcb541f?use_case=side_bar */
import express from 'express';

interface NewFeatures extends express.Request {
  user: string,
  password: string,
}

export default NewFeatures;