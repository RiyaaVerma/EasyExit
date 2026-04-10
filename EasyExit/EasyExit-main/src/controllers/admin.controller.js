import {
    response_200,
    response_500,
} from '../utils/responseCodes.js';
import Form from '../models/form.model.js';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    security: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})




export async function pendingPasses(req, res) {
    console.log("🔥 PENDING API HIT");
    Form.find({ isAccepted : false }).sort({_id:-1})
        .then((finalResult) => {
            return response_200(res, 'Fetched all pending outpasses!!', finalResult);
        }).catch(error => { return response_500(res, 'Internal server error', error); });

}
export async function outpass(req, res) {
    try {
        const id = req.body.id;
        const status = req.body.status === true || req.body.status === "true";
        const reason = status ? null : req.body.reason;
        const otp = Math.floor(Math.random() * 900000) + 100000;

        // 1. Update the Form status first
        const result = await Form.findByIdAndUpdate(
            id, 
            { $set: { isAccepted: status, otp: status ? otp : null, rejectReason: status ? null : reason } }, 
            { new: true }
        );

        if (!result) {
            return response_500(res, "Form not found in database");
        }

        // 2. Try to find the User
        const userEmail = result.roll + "@nith.ac.in";
        const finalResult = await User.findOne({ email: userEmail });

        // If user doesn't exist, we still return success because the DB updated
        if (!finalResult) {
            console.log("⚠️ Student not found in Users collection. Skipping email.");
            return response_200(res, status ? 'Approved (User not found for email)' : 'Declined (User not found for email)');
        }

        // 3. Prepare Email
        const name = finalResult.name;
        const message = status 
            ? `Dear ${name}, your outpass has been approved! \n Use ${otp} as your OTP to leave.` 
            : `Oops!! ${name}, your outpass has been declined due to the following reason: \n ${reason}`;

        const senderEmail = 'riyaverma@gmail.com';
        const mailOptions = {
            from: 'Warden GH',
            to: finalResult.email,
            subject: status ? "Outpass Approved" : "Outpass Declined",
            replyTo: senderEmail,
            html: `${message} <br><br> From: ${senderEmail}`
        };

        // 4. Send Email (non-blocking)
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log("❌ Email failed to send, but status was updated.");
            } else {
                console.log("✅ Email sent: " + data.response);
            }
        });

        // Return success immediately once DB is updated
        return response_200(res, status ? 'Outpass Approved!' : 'Outpass Declined!');

    } catch (error) {
        console.error("🔥 Server Error:", error);
        return response_500(res, 'Internal server error', error);
    }
}
// export async function outpass(req, res) {
//     const id = req.body.id;
//     // console.log(id)
//     const status = req.body.status === true || req.body.status === "true";
//     console.log(status)
//     const reason = status ? null : req.body.reason;
//     const otp = Math.floor(Math.random() * 900000) + 100000;
    
//     Form.findByIdAndUpdate(id, { $set: { isAccepted: status, otp: status ? otp : null, rejectReason: status ? null : reason } }, { new: true })
//         .then((result) => {

//             if (!result) {
//                 return response_500(res, "Form not found");
//             }

//             // console.log(result.roll + "@nith.ac.in");
//             User.findOne({ email: result.roll + "@nith.ac.in" })
//             .then((finalResult) => {
//                 // console.log(finalResult)
//                 if (!finalResult) {
//                     return response_500(res, "User not found");
//                 }
//                 var name = finalResult.name
//                 var message = status ? `Dear ${name}, your outpass has been approved! \n Use ${otp} as your otp to get the hell out of here` : `Oops!! ${name}, your outpass have been declined due to the following reason :- \n ${reason} \n. Please contact your respective caretaker/warden for queries.`

//                 var senderEmail = 'riyaverma@gmail.com'

//                 var mailOptions = {
//                     from: 'Warden GH',
//                     to: finalResult.email,
//                     subject: status ? "Outpass Approved" : "Outpass Declined",
//                     replyTo: senderEmail,
//                     html: `${message} <br><br> From:${senderEmail}`
//                 }
//                 transporter.sendMail(mailOptions, (err, data) => {
//                     if (err) { 
//                         return response_500(res, 'Internal server error', err); 
//                     } else {
//                         console.log("email sent " + data.response);

//                         return response_200(
//                             res,
//                             status 
//                             ? 'Outpass Approved! OTP sent!' 
//                             : 'Outpass declined! mail sent!'
//                         );
//                     }
//                 });
//                 // transporter.sendMail(mailOptions, (err, data) => {
//                 //     if (err) { return response_500(res, 'Internal server error', err); }
//                 //     else {
//                 //         res.json({
//                 //             status: "success"
//                 //         })
//                 //         console.log("email sent " + data.response)
//                 //     }
//                 // })

//                 // return response_200(res, status ? 'Outpass Approved! OTP sent!' : 'Outpass declined! mail sent!');
//             })
//         }).catch(error => { return response_500(res, 'Internal server error', error); });

// }

export async function acceptedPasses(req, res) {

    Form.find({ isAccepted: true }).sort({_id:-1})
        .then((finalResult) => {
            return response_200(res, 'Fetched all accepted outpasses!!', finalResult);
        }).catch(error => { return response_500(res, 'Internal server error', error); });
}

export async function rejectedPasses(req, res) {
    Form.find({ rejectReason:{ $ne: null, $exists: true } }).sort({_id:-1})
        .then((finalResult) => {
            console.log(finalResult)
            return response_200(res, 'Fetched all rejected outpasses!!', finalResult);
        }).catch(error => { return response_500(res, 'Internal server error', error); });
}

// transporter.verify(function (err, success) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Server is ready to send emails")
//     }

// });
