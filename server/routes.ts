import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Nothing special needed for the server - frontend handles everything
  // Just setting up the minimal required HTTP server

  const httpServer = createServer(app);
  
  return httpServer;
}
