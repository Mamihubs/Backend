import { ProfileDoc } from "../models/Profile"
import { UserDoc } from "../models/User"

const Sib = require("sib-api-v3-sdk")
require("dotenv").config()

export const sendConfirmationEmail = function (user : UserDoc) {
    return new Promise((res, rej) => {
        const client = Sib.ApiClient.instance

        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.MAIL_API_KEY;


        const tranEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email: `info@femzyonlinecollege.com`,
            name: 'MamiHub'
        }

        const receivers = [
            {
                email: user.login
            }
        ]

        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Mamihub - Successful Registration",
            htmlContent: `
                <div style="background-color: #ffffff; font-family: 'Poppins';">
                    <div style="max-width: 500px; margin: auto;">
                        <div style="display: flex; background: #F9F9F9; padding: 1rem; align-items: center; margin: 0; justify-content: center;">
                            <div style="margin-right: 1rem; height: 40px; width: 40px; overflow: hidden;">
                                <a href="https://www.femzyonlinecollege.com" target='_blank'><img style="height: 40px; width: 40px;" src='https://frontend-mamihubs.vercel.app/_next/image?url=%2Fimages%2FMami_Logo-removebg-preview%201.png&w=256&q=75&dpl=dpl_91hdteMomTkijKc1LcXemMDRJEX3' width="40px" alt='FOC' /></a>
                            </div>
                            <div>
                                <h3 style="font-weight: 700; font-size: 1.3rem; margin: .5rem;">Mamihub</h3>
                            </div>
                        </div>
                        <div style="background-color: #ffffff; padding: 1rem; font-family: 'Livvic';">
                            <h4 style="margin: .5rem 0 1rem 0;">Hi ${user.fullName}</h4>
                            <div class="messageContainer">
                                <p style="font-size: .85rem; line-height: 1.5; text-align: justify;">
                                    We are happy to have you on Board, Welcome to the MamiHub, The online store where you get all you need
                                    
                                    Feeling stuck at any point? Kindly reach out to us via the contact us page or by email @ mamihub@gmail.com
                                    and we will be happy to help!
                                    <br>
                                    <br>
                                    You can now proceed to your <a style="text-decoration: none; font-weight: 600;" href="https://www.frontend.mamihubs.vercel.app">MamiHub</a>
                                    <br> <br>
                                    Mr. Osita
                                    <br>
                                    Founder, Mamihub.

                                </p>
                            </div>
                        </div>
                        <div style="background-color: #F9F9F9; padding: 1rem; text-align: center; font-size: 0.9rem;">
                            &copy; Mamihub 2023
                        </div>
                    </div>

                </div>
            `
        }).then((info: object)=>res(info)).catch((err: Error)=>rej(err))
    })
}

export const verificationEmail = function (code : string, user : UserDoc) {
    return new Promise((res, rej) => {
        const client = Sib.ApiClient.instance

        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.MAIL_API_KEY

        const tranEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email: `mamihub@femzyonlinecollege.com`,
            name: 'MamiHub'
        }

        const receivers = [
            {
                email: user.login
            }
        ]
        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "MamiHub - Verification",
            htmlContent: `
            <div style="background-color: #ffffff; font-family: 'Poppins';">
        <div style="max-width: 500px; margin: auto;">
            <div style="display: flex; background: #F9F9F9; padding: 1rem; margin: 0; justify-content: center;">
                <div style="margin-right: 1rem; height: 40px; width: 40px; overflow: hidden;">
                    <a href="https://www.frontend.mamihubs.vercel.app" target='_blank'><img style="height: 40px; width: 40px;"
                            src='https://frontend-mamihubs.vercel.app/_next/image?url=%2Fimages%2FMami_Logo-removebg-preview%201.png&w=256&q=75&dpl=dpl_91hdteMomTkijKc1LcXemMDRJEX3' width="40px" alt='MH' /></a>
                </div>
                <div>
                    <h1 style="font-weight: 700; font-size: 1.4rem; margin: .5rem; color: #305C45;">MamiHub</h1>
                </div>
            </div>
            <div style="background-color: #ffffff; padding: 1rem; font-family: 'Livvic';">
                <h4 style="margin: .5rem 0 1rem 0;">Hi ${user.fullName},</h4>
                <div class="messageContainer">
                    <p style="font-size: .85rem; line-height: 1.5; text-align: justify;">
                        To Verify your account, use the OTP below
                        <br>
                    </p>
                    <div
                        style="background:#F9F9F9; max-width: 300px; padding: 1rem; margin:auto; border-radius: 3px; text-align: center;">
                        <h1 style="color: #305C45;">${code}</h1>
                    </div>

                </div>
            </div>
            <div style="background-color: #F9F9F9; padding: 1rem; text-align: center; font-size: 0.9rem;">
                &copy; MamiHub 2023
            </div>
        </div>

    </div>
            `
        }).then((info: object)=>{
            res(info)
        }).catch((err : Error)=>rej(err))
    })
}
