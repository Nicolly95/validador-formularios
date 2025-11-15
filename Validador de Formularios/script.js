


//construtor 
let Validator = {
    handleSubmit: (event) => {                                          //função que bloqueia o envio do formulário 
        event.preventDefault();

        let inputs = form.querySelectorAll("input");                                    //seleciona todos os inputs

        let send = true;

        Validator.clearErrors();                                    //limpa os erros anteriores para não se somarem

        for(let i = 0; i < inputs.length; i++) {                                            //itera todos os inputs
            let input = inputs[i];                                             //armazena o input atual da iteração
            console.log(input);                                          //retorna todos os inputs para eu me achar

            let check = Validator.checkInput(input);            //retorna true se o input é válido, ou mostra o erro
            if(check !== true) {
                send = false;
                
                Validator.showError(input, check);                           //mostra o erro no input não preenchido
            }
        }       

        if(send) {
            form.submit();                                     //se send=true, o metodo submit() enviará o formulário
        }
    },
    checkInput: (input) => {
        //verifica se o input que foi iterado (.13) contem o atributo "data-rules" e o retorna para 'rules'
        let rules = input.getAttribute("data-rules");       
        if(rules !== null) {                          //se o 'rules' conter alguma regra de validação, o "data-rules"
              
            //separa as regras do html pelo símbolo '|' e 'rules' conterá um array com as regras: [required, min]
            rules = rules.split("|"); 

            for(let i in rules) {                                       //itera todas as regras que foram encontradas
                let rulesDetails = rules[i].split("=");           //separa quando a regra houver um '=' para analisar

                //'required' está em [0]
                //'min' está em [0]   e  '2' está em [1] - ver arq html
                switch(rulesDetails[0]) {                 
                    case "required":
                        if(input.value == "") {                             //verifica se o input não foi preenchido
                            return ("Preencha este campo <span>!</span>");
                        }
                    break;
                    case "min":
                        if(input.value.length < rulesDetails[1]) {        //rulesDetails[1] se refere a parte " =2 "
                            return ("Mínimo " + rulesDetails[1] +  " caracteres <span>!</span>");
                        }
                    break;
                    case "email":
                        if(input.value !== "") {                                     //se tiver conteúdo neste input
                            const regex = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
                            if(!regex.test(input.value.toLowerCase())) {    //dispara erro se NÃO for um email valido
                                return ("E-mail inválido <span>!</span>");
                            }     
                        }
                    break;
                }
            }
        }
        return true;                                                 //se não houver nenhuma regra, libera como true
    },
    showError: (input, error) => {                              //passa o 'input' e a mensagem 'error' como parametro
        input.style.borderColor = "rgba(0, 132, 255, 1)";


        document.querySelectorAll(".div-fantasma").forEach((div) => {
            div.style.display = "none";
        });        
        
        let errorElement = document.createElement("div");                //cria a div que conterá a mensagem de erro
        errorElement.classList.add("error");           //adiciona a classe de erro na div criada para poder estilizar
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll("input");
        for(let i=0 ; i<inputs.length; i++) {
            inputs[i].style = "";
        }

        let errorElements = document.querySelectorAll(".error");
        for(let i = 0; i< errorElements.length; i++) {
            errorElements[i].remove();                                              //remove o item na lista de erros
        }
    }
}

//recupera o validator
let form = document.querySelector(".validator");
form.addEventListener("submit", Validator.handleSubmit);


function clearForm () {
    let inputs = document.querySelectorAll("input:not(.button)");

    inputs.forEach((input) => input.value = "");                 //limpa os valores dos inputs ao atualizar a página
}
clearForm();



































































