import express from 'express';
import onboardingController from '../controllers/onboardingController';
import upload from '../utils/multerConfig';

const router = express.Router();


/**
 * @swagger
 * /api/onboarding/create-business-information:
 *   post:
 *     tags: [OnBoarding]
 *     description: create new business account
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *               $ref: '#/components/schemas/CreateBusinessRequest'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     $ref: '#/components/schemas/BusinessResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/create-business-information",upload.single("image"), onboardingController.createBusinessInformation);

/**
 * @swagger
 * /api/onboarding/create-bank:
 *   post:
 *     tags: [OnBoarding]
 *     description: create new bank account
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/CreateBankRequestBody'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     $ref: '#/components/schemas/BankResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/create-bank", onboardingController.createBank);

/**
 * @swagger
 * /api/onboarding/create-identity-individual:
 *   post:
 *     tags: [OnBoarding]
 *     description: create individual identity
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/CreateIdentityIndividualRequestBody'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     $ref: '#/components/schemas/IdentityIndividualResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/create-identity-individual", onboardingController.createIdentityIndividual);

/**
 * @swagger
 * /api/onboarding/create-identity-company:
 *   post:
 *     tags: [OnBoarding]
 *     description: create company identity
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/CreateIdentityCompanyRequestBody'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     $ref: '#/components/schemas/IdentityCompanyResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/create-identity-company", onboardingController.createIdentityCompany); 

/**
 * @swagger
 * /api/onboarding/update-business-information/{id}:
 *   put:
 *     tags: [OnBoarding]
 *     description: update a business information
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: ID of the business to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/BaseBusinessRequest'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     $ref: '#/components/schemas/BusinessResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/update-business-information/:id", onboardingController.updateBusinessInformation);

/**
 * @swagger
 * /api/onboarding/update-bank/{id}:
 *   put:
 *     tags: [OnBoarding]
 *     description: update a bank information
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: ID of the bank to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/CreateBankRequestBody'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     $ref: '#/components/schemas/BankResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/update-bank/:id", onboardingController.updateBank);


/**
 * @swagger
 * /api/onboarding/update-identity-individual/{id}:
 *   put:
 *     tags: [OnBoarding]
 *     description: update a individual identity information
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: ID of the individual to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/CreateIdentityIndividualRequestBody'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     $ref: '#/components/schemas/IdentityIndividualResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/update-identity-individual/:id", onboardingController.updateIdentityIndividual);

/**
 * @swagger
 * /api/onboarding/update-identity-company/{id}:
 *   put:
 *     tags: [OnBoarding]
 *     description: update a company identity information
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: ID of the company to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/CreateIdentityCompanyRequestBody'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     $ref: '#/components/schemas/IdentityCompanyResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/update-identity-company/:id", onboardingController.updateIdentityCompany); 



export default router;