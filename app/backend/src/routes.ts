import { Router } from "express";
import { login } from "./controller/authController";
import { getUserById,
         createUser,
         updateUser, 
         destroyUser,
         patchUser,
         getMe } from "./controller/UserController";
import { authenticateToken } from "./middleware/authMiddleware";
import * as VehicleController from './controller/VehicleController';

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
 *         description: Login bem-sucedido, retorna um token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIs..."
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
 *               passwd1:
 *                 type: string
 *                 example: "senha123"
 *               passwd2:
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
 *               Tipo:
 *                 type: string
 *                 description: Tipo do veículo (carro, moto, etc.)
 *               Marca:
 *                 type: string
 *               Modelo:
 *                 type: string
 *               Combustivel:
 *                 type: string
 *               anoModelo:
 *                 type: integer
 *                 description: Ano do modelo
 *               Valor:
 *                 type: string
 *                 description: Valor do veículo (string formatada)
 *               ValorFipe:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 */
// router.post('/create-vehicle', VehicleController.create);


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
 *               tipo:
 *                 type: string
 *                 example: carros
 *               ano:
 *                 type: integer
 *                 example: 2020
 *     responses:
 *       200:
 *         description: Lista de veículos filtrada por tipo e ano
 */
// router.post('/get-vehicles', .getByFilters);


/**
 * @swagger
 * /get-vehicle:
 *   get:
 *     summary: Buscar um veículo pelo código Fipe
 *     tags: [Veículos]
 *     parameters:
 *       - in: query
 *         name: codigoFipe
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do veículo encontrado
 *       404:
 *         description: Veículo não encontrado
 */
// router.get('/get-vehicle', VehicleController.getByCodigoFipe);

/**
 * @swagger
 * /update-vehicle:
 *   put:
 *     summary: Atualizar um veículo por ID
 *     tags: [Veículos]
 *     parameters:
 *       - in: query
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
// router.put('/update-vehicle', VehicleController.update);

/**
 * @swagger
 * /delete-vehicle:
 *   delete:
 *     summary: Remover um veículo por ID
 *     tags: [Veículos]
 *     parameters:
 *       - in: query
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
// router.delete('/delete-vehicle', VehicleController.remove);


export default router;

