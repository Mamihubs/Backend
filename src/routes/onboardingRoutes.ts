import express from 'express';
import onboardingController from '../controllers/onboardingController';

const router = express.Router();


router.post("/create-business-information", onboardingController.createBusinessInformation);
router.post("/create-bank", onboardingController.createBank);
router.post("/create-identity-individual", onboardingController.createIdentityIndividual);
router.post("/create-identity-company", onboardingController.createIdentityCompany); 
router.put("/update-business-information", onboardingController.updateBusinessInformation);
router.put("/update-bank", onboardingController.updateBank);
router.put("/update-identity-individual", onboardingController.updateIdentityIndividual);
router.put("/update-identity-company", onboardingController.updateIdentityCompany); 



export default router;