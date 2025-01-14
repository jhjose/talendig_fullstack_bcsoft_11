class AuthService {
    constructor(){
        this.baseUrl = process.env.REACT_APP_API_URL
    }

    async login(credentials){
        try {
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if(!response.ok){
                throw new Error('Error en la autenticación, favor verifique sus credenciales.');
            }

            const data = await response.json();

            localStorage.setItem('token', data.token);

            return data;

        } catch (error) {
            throw error;
        }
    }

}