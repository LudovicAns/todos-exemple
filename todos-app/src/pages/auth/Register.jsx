import React, {useState} from 'react';
import {Description, Field, FieldGroup, Fieldset, Label, Legend} from "../../composants/catalyst-ui/fieldset.jsx";
import {Text} from "../../composants/catalyst-ui/text.jsx";
import {Input} from "../../composants/catalyst-ui/input.jsx";
import {Button} from "../../composants/catalyst-ui/button.jsx";
import axios from "axios";
import {LoaderCircle} from "lucide-react";

function Register(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatarLink, setAvatarLink] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        axios.post('/api/users/register', {
            email: email,
            password: password,
            avatarURL: avatarLink && avatarLink.length > 0 ? avatarLink : null
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setError(null);
            setSuccess(res.data.message);
        }).catch(err => {
            setError(err.response.data.message);
            setSuccess(null);
        }).finally(() => {
            setLoading(false);
        })

    }

    function validateForm() {
        if (email.length < 1) {
            setError("L'email est obligatoire.");
            return false;
        }

        if (password.length < 1) {
            setError("Le mot de passe est obligatoire.");
            return false;
        }

        if (confirmPassword.length < 1) {
            setError("La confirmation du mot de passe est obligatoire.");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return false;
        }
        return true;
    }

    return (
        <form className={`max-w-md border border-neutral-800 p-8 rounded-md`}>
            <Fieldset>
                <Legend>Formulaire d'inscription</Legend>
                <Text>Remplissez correctement les champs afin de créer votre compte utilisateur.</Text>
                <FieldGroup>
                    <Field>
                        <Label>Email</Label>
                        <Input type="email" name={"email"} onChange={(e) => setEmail(e.target.value)}/>
                    </Field>
                    <Field>
                        <Label>Mot de passe</Label>
                        <Input type={"password"} name={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    </Field>
                    <Field>
                        <Label>Confirmation mot de passe</Label>
                        <Input type={"password"} name={"confirm-password"}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Field>
                    <Field>
                        <Label>Lien de l'avatar</Label>
                        <Input type={"text"} name={"avatar-link"} onChange={(e) => setAvatarLink(e.target.value)}/>
                        <Description>Le lien doit rediriger vers une image valide.</Description>
                    </Field>
                </FieldGroup>
            </Fieldset>
            <Button onClick={handleSubmit}
                    type={"submit"}
                    className={`mt-8 w-full`}>
                {loading ? <LoaderCircle className={`ml-2`}/> : "S'inscrire"}
            </Button>
            <div className={`text-center mt-4 ${error ? `text-red-500` : `text-green-500`}`}>
                {error && <p className={``}>{error}</p>}
                {success && <p className={``}>{success}</p>}
            </div>
        </form>
    );
}

export default Register;