import { Review, IReview } from "../model/ReviewModel";

export const create = async ({
  title,
  content,
  rating,
  userId,
}: Omit<IReview, "id" | "createdAt" | "updatedAt">) => {
  try {
    const newReview = await Review.create({ title, content, rating, userId });
    return newReview;
  } catch (error) {
    throw new Error("Erro ao criar review.");
  }
};

export const getAll = async () => {
  return await Review.findAll({ include: { all: true } });
};

export const getById = async (id: number) => {
  const review = await Review.findByPk(id, { include: { all: true } });

  if (!review) {
    throw new Error("Review não encontrada.");
  }

  return review;
};

export const update = async (
  id: number,
  updateData: Partial<Omit<IReview, "id" | "createdAt" | "updatedAt" | "userId">>
) => {
  const review = await Review.findByPk(id);

  if (!review) {
    throw new Error("Review não encontrada.");
  }

  await review.update(updateData);
  return review;
};

export const deleteById = async (id: number) => {
  const review = await Review.findByPk(id);

  if (!review) {
    throw new Error("Review não encontrada.");
  }

  await review.destroy();
  return { message: "Review excluída com sucesso." };
};
