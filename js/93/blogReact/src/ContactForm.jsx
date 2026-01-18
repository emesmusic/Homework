import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm(props) {
    const formRef = useRef();
    const { setResult } = props;
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_1pl19n8",
                "template_e6z0dbo",
                formRef.current,
                "GnHqjkZuENLZB-EtZ"
            )
            .then(
                () => {
                    setResult([true,"Email sent successfully"]);
                    formRef.current.reset();

                },
                (error) => {
                    setResult([false,"Email failed:", error.text]);
                }
            );
    };

    return (
        <>
            <form ref={formRef} onSubmit={sendEmail} className="contact-form">
                <label className="form-element">Name:
                <input type="text" name="user_name" required />
                </label>
                <label className="form-element">Email:
                <input type="email" name="user_email" required />
                </label>
                <label className="form-element">Message:
                <textarea name="message" required className="message-input"/>
                </label>
                <button type="submit">Send</button>
            </form>

        </>
    );
}