import { Router } from "express";
import { login } from "./controller/authController";
import { getUserById,
         createUser,
         updateUser, 
         destroyUser,
         patchUser,
         getMe } from "./controller/UserController";
import { authenticateToken } from "./middleware/authMiddleware";
import { createVehicle,
         destroyVehicle,
         getByFilters,
         getByFipeCode,
         updateVehicle } from './controller/VehicleController';
         import {
            createReview,
            getAllReviews,
            getReviewById,
            updateReview,
            deleteReview,
          } from "./controller/ReviewController";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Endpoint para autenticação de usuários.
 *   - name: Usuário
 *     description: Endpoints para operações de usuários autenticados.
 *   - name: Veículos
 *     description: Endpoints para operações de veículos.
 */

// USER
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@email.com"
 *               passwd:
 *                 type: string
 *                 example: "passwd"
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna um token JWT e dados do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIs..."
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 userName:
 *                   type: string
 *                   example: "Nome Sobrenome"
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", login);

/**
 * @swagger
 * /get-user:
 *   post:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna os dados do usuário autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Test"
 *                 email:
 *                   type: string
 *                   example: "test@email.com"
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post("/get-user", authenticateToken, getUserById);

/**
 * @swagger
 * /get-user:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Dados do usuário autenticado."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Test"
 *                     email:
 *                       type: string
 *                       example: "test@email.com"
 *                     access:
 *                       type: string
 *                       example: "admin"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: "Usuário não autenticado ou token inválido."
 *       404:
 *         description: "Usuário não encontrado."
 *       500:
 *         description: "Erro ao buscar usuário."
 */
router.get("/get-user", authenticateToken, getMe);

/**
 * @swagger
 * /new-user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test"
 *               email:
 *                 type: string
 *                 example: "test2@email.com"
 *               passwd:
 *                 type: string
 *                 example: "senha123"
 *               passwdCheck:
 *                 type: string
 *                 example: "senha123"
 *               cpf:
 *                 type: string
 *                 example: "00581361008"
 *               access:
 *                 type: string
 *                 enum: [user, admin, guest]
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: "Usuário criado com sucesso."
 *       400:
 *         description: "Erro na requisição (ex: senhas não coincidem)."
 *       500:
 *         description: "Erro interno ao criar usuário."
 */
router.post("/new-user", createUser);

/**
 * @swagger
 * /update-user:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Novo Nome"
 *               email:
 *                 type: string
 *                 example: "email@email.com"
 *               passwd:
 *                 type: string
 *                 example: "novaSenha123"
 *               access:
 *                 type: string
 *                 enum: [user, admin, guest]
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: "Usuário atualizado com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário atualizado com sucesso."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Novo Nome"
 *                     email:
 *                       type: string
 *                       example: "email@email.com"
 *                     access:
 *                       type: string
 *                       example: "admin"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: "Requisição inválida (ex: dados faltando)."
 *       401:
 *         description: "Usuário não autenticado ou token inválido."
 *       500:
 *         description: "Erro ao atualizar usuário."
 */
router.put("/update-user", authenticateToken, updateUser);

/**
 * @swagger
 * /delete-user:
 *   delete:
 *     summary: Exclui a conta do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Usuário excluído com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário excluído com sucesso."
 *       401:
 *         description: "Usuário não autenticado ou token inválido."
 *       404:
 *         description: "Usuário não encontrado."
 *       500:
 *         description: "Erro ao excluir usuário."
 */
router.delete("/delete-user", authenticateToken, destroyUser);

/**
 * @swagger
 * /patch-user:
 *   patch:
 *     summary: Atualiza parcialmente os dados do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Novo Nome"
 *               email:
 *                 type: string
 *                 example: "email@email.com"
 *     responses:
 *       200:
 *         description: "Usuário atualizado com sucesso."
 *       401:
 *         description: "Usuário não autenticado ou token inválido."
 *       500:
 *         description: "Erro ao atualizar usuário."
 */
router.patch("/patch-user", authenticateToken, patchUser);

// VEHICLE
/**
 * @swagger
 * /create-vehicle:
 *   post:
 *     summary: Criar um novo veículo
 *     tags: [Veículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CodigoFipe:
 *                 type: string
 *                 description: Código FIPE do veículo
 *                 example: "811013-1"
 *               Tipo:
 *                 type: string
 *                 description: Tipo do veículo (carro, moto, etc.)
 *                 example: "motos"
 *               Marca:
 *                 type: string
 *                 example: "HONDA"
 *               Modelo:
 *                 type: string
 *                 example: "CBR 600 F"
 *               Combustivel:
 *                 type: string
 *                 example: "Gasolina"
 *               anoModelo:
 *                 type: integer
 *                 description: Ano do modelo
 *                 example: 1998
 *               Valor:
 *                 type: string
 *                 description: Valor do veículo (string formatada)
 *                 example: "R$ 20.787,00"
 *               ValorFipe:
 *                 type: number
 *                 format: float
 *                 example: 20787.00
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 */
router.post('/create-vehicle', createVehicle);


/**
 * @swagger
 * /get-vehicles:
 *   post:
 *     summary: Buscar veículos por tipo e ano
 *     tags: [Veículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Tipo:
 *                 type: string
 *                 example: carros
 *               anoModelo:
 *                 type: integer
 *                 example: 2020
 *     responses:
 *       200:
 *         description: Lista de veículos filtrada por tipo e ano
 */
router.post('/get-vehicles', getByFilters);


/**
 * @swagger
 * /get-vehicle:
 *   get:
 *     summary: Get vehicle by Fipe code
 *     tags: [Veículos]
 *     parameters:
 *       - in: query
 *         name: CodigoFipe
 *         required: true
 *         description: Fipe code of the vehicle (e.g., 031056-5)
 *         schema:
 *           type: string
 *           example: "031056-5"
 *     responses:
 *       200:
 *         description: Vehicle found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 CodigoFipe:
 *                   type: string
 *                 Tipo:
 *                   type: string
 *                 Marca:
 *                   type: string
 *                 Modelo:
 *                   type: string
 *                 Combustivel:
 *                   type: string
 *                 anoModelo:
 *                   type: integer
 *                 Valor:
 *                   type: string
 *                 ValorFipe:
 *                   type: number
 *       400:
 *         description: Missing or invalid Fipe code
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-vehicle', getByFipeCode);

/**
 * @swagger
 * /update-vehicle/{id}:
 *   put:
 *     summary: Atualizar um veículo por ID
 *     tags: [Veículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Tipo:
 *                 type: string
 *               Marca:
 *                 type: string
 *               Modelo:
 *                 type: string
 *               Combustivel:
 *                 type: string
 *               anoModelo:
 *                 type: integer
 *               Valor:
 *                 type: string
 *               ValorFipe:
 *                 type: number
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *       404:
 *         description: Veículo não encontrado
 */
router.put('/update-vehicle/:id', updateVehicle);

/**
 * @swagger
 * /delete-vehicle/{id}:
 *   delete:
 *     summary: Remover um veículo por ID
 *     tags: [Veículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo removido com sucesso
 *       404:
 *         description: Veículo não encontrado
 */
router.delete('/delete-vehicle/:id', destroyVehicle);


/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Lista todos os reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Lista de reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/reviews", getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Retorna um review pelo seu ID
 *     tags: [Review]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do review
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do review encontrado.
 *       404:
 *         description: Review não encontrado.
 */
router.get("/reviews/:id", getReviewById);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Cria um novo review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Excelente Produto"
 *               content:
 *                 type: string
 *                 example: "Gostei bastante da experiência com esse produto."
 *               rating:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Review criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro interno.
 */
router.post("/reviews", authenticateToken, createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Atualiza um review existente
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do review a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Novo Título"
 *               content:
 *                 type: string
 *                 example: "Texto atualizado do review."
 *               rating:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: Review atualizado com sucesso.
 *       404:
 *         description: Review não encontrado.
 */
router.put("/reviews/:id", authenticateToken, updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Exclui um review pelo ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do review a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review excluído com sucesso.
 *       404:
 *         description: Review não encontrado.
 */
router.delete("/reviews/:id", authenticateToken, deleteReview);


export default router;

