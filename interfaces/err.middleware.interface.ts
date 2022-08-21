import express from 'express';

interface ErrorMiddleware extends express.ErrorRequestHandler {
  name: string,
  message: string,
}

export default ErrorMiddleware;