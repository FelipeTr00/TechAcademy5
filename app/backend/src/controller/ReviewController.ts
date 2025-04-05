import { Request, Response } from "express";
import * as ReviewService from "../service/ReviewService";

export const createReview = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { title, content, rating } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "[ALERTA] Título e conteúdo são obrigatórios." });
  }

  try {
    const newReview = await ReviewService.create({ title, content, rating, userId });
    res.status(201).json({ message: "[SUCESSO] Review criada com sucesso.", review: newReview });
  } catch (error) {
    console.error("[ERRO] ao criar review:", error);
    res.status(500).json({ message: "[ERRO] Erro ao criar review." });
  }
};

export const getAllReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await ReviewService.getAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("[ERRO] ao listar reviews:", error);
    res.status(500).json({ message: "[ERRO] Erro ao listar reviews." });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  const reviewId = Number(req.params.id);

  try {
    const review = await ReviewService.getById(reviewId);
    res.status(200).json(review);
  } catch (error) {
    console.warn(`[ALERTA] Review com ID ${reviewId} não encontrada.`);
    res.status(404).json({ message: "[ALERTA] Review não encontrada." });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const reviewId = Number(req.params.id);
  const updateData = req.body;

  try {
    const updatedReview = await ReviewService.update(reviewId, updateData);
    res.status(200).json({ message: "[SUCESSO] Review atualizada com sucesso.", review: updatedReview });
  } catch (error) {
    console.error(`[ERRO] ao atualizar review ID ${reviewId}:`, error);
    res.status(404).json({ message: "[ERRO] Erro ao atualizar review." });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const reviewId = Number(req.params.id);

  try {
    const result = await ReviewService.deleteById(reviewId);
    res.status(200).json({ message: "[SUCESSO] Review excluída com sucesso." });
  } catch (error) {
    console.error(`[ERRO] ao excluir review ID ${reviewId}:`, error);
    res.status(404).json({ message: "[ERRO] Erro ao excluir review." });
  }
};
