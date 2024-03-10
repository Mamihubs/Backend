import express from 'express';
import onboardingController from '../controllers/onboardingController';
import upload from '../utils/multerConfig';

const router = express.Router();


router.post("/create-business-information",upload.single("image"), onboardingController.createBusinessInformation);
router.post("/create-bank", onboardingController.createBank);
router.post("/create-identity-individual", onboardingController.createIdentityIndividual);
router.post("/create-identity-company", onboardingController.createIdentityCompany); 
router.put("/update-business-information/:id", onboardingController.updateBusinessInformation);
router.put("/update-bank/:id", onboardingController.updateBank);
router.put("/update-identity-individual/:id", onboardingController.updateIdentityIndividual);
router.put("/update-identity-company/:id", onboardingController.updateIdentityCompany); 



export default router;