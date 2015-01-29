define({
    tutorial: {
        recepcao: [
            //Recepcionista 
            "Bom dia! Ainda não conheço você. Como posso ajudar",
            //Jogador
            "Bom dia. Sou profissional de enfermagem e hoje é meu primeiro dia de trabalho.",
            //Recepcionista 
            "Ah, sim! Sou Clarice, a recepcionista. O Enfermeiro mentor está te esperando no corredor."
        ],
        corredor: [
            //Mentor
                "Olá! Toda a equipe do Hospital Cuidando Bem te deseja boas vindas!Sou Alberto, seu enfermeiro mentor.  " +
                "Aqui nossa missão é a garantia da segurança de nossos pacientes através dos protocolos. Você fará um estágio " +
                "de experiência e, caso se saia bem, seu contrato será definitivo.",

            //Jogador op 1
            "Agradeço, Alberto! Espero conseguir atender suas expectativas.",
            //Jogador op 2
            " Preciso começar agora?",
            // Mentor
            "Esteja sempre preparado para o trabalho",
            //Jogador op 3
            "Agradeço, Alberto, mas tenho certeza que posso trabalhar sem sua supervisão.",
            // Mentor
            "Sempre aceite ajuda de um profissional mais experiente.",

            //Mentor
            "Agora me acompanhe, começaremos pela enfermaria masculina."
        ],
        leito: {
            conversa1: [
                //0 Mentor
                    "Este é o Sr. João, seu primeiro paciente. Um dos principais protocolos de segurança" +
                    " é a sua apresentação ao paciente e a certificação de que a identificação dele está correta.",
                //1 Jogador op 1
                    "Olá Sr. João. Sou profissional de enfermagem e cuidarei do Sr. hoje. " +
                    "Como está se sentindo?",
                //2 Jogador op 2
                "Olá, sou eu quem cuidará do senhor hoje. Está se sentindo bem?",
                //3 Mentor
                "Você precisa se apresentar como profissional de enfermagem!",
                //4 Jogador op 3
                    "Olá, senhor João. Sou profissional de enfermagem do hospital, tenho 28 anos e cuidarei" +
                    "do senhor hoje. É um prazer conhecê-lo. Como está se sentindo?",
                //5 Mentor
                "Sua apresentação contém informações desnecessárias.",

                //6 Paciente
                    "Estou com muita dor de cabeça e passei muito nervoso hoje, acho que minha" +
                    "pressão subiu. É a primeira vez que preciso ser internado em um hospital e estou com um" +
                    "pouco de medo.",

                //7 Jogador op 1
                    "Vamos fazer o possível para que sua estadia aqui seja rápida e que se sinta " +
                    "em casa. Porém, primeiro preciso do seu nome completo e da sua data de nascimento, tudo bem?!",
                //8 Jogador op 2
                " Vamos fazer o possível para que se sinta confortável.",
                //9 Mentor
                "Você precisa das informações sobre o paciente.",
                //10    Jogador op 3
                    "HAHAHA fique sussa, seu João, o senhor vai pra casa em breve. Mas primeiro preciso" +
                    "dos seus dados.",
                //11    Mentor
                "Sua resposta está vaga e informal. Você pode melhorar!",

                //12    Paciente
                "Meu nome é João Manoel Ribeiro, nasci no dia 07-06-1956.",

                //13    Jogador
                " Está certo, seu João. Já tenho todas as informações de que preciso ",

                //14    Mentor
                    "Sua primeira missão é admitir o Sr. João nesta enfermaria, identificando-o com uma " +
                    "pulseira e verificando os seus sinais vitais. Antes de começar, vá até o posto de enfermagem " +
                    "retirar os instrumentos necessários."
            ],
            conversa2: [
                //Jogador op 1
                    "Sr. João, esta pulseira agora é a sua identificação aqui dentro do hospital. Ela é " +
                    "importante para que ninguém o confunda com outro paciente. Daqui em diante, quando for " +
                    "submetido a um procedimento médico, peça ao profissional de saúde para verificar essa " +
                    "identificação. Agora preciso verificar seus sinais vitais, ok?",
                //Jogador op 2
                    "Senhor João, fique com esta pulseira de identificação até o fim de sua " +
                    "estadia aqui. Vamos realizar alguns procedimentos médicos?",
                //Mentor
                "Você deve explicar ao paciente a função da pulseira de identificação.",
                //Jogador op 3
                "Senhor João, vamos verificar seus sinais vitais?",
                //Mentor
                "Não se esqueça: A pulseira de identificação é importante!",
                // Paciente
                "Ok. Obrigado.",
                // Jogador
                "De nada.",
                // Mentor
                    "Parabéns, você conseguiu admitir o paciente neste hospital! " +
                    "Agora falta algo muito importante: anotar os procedimentos realizados e os " +
                    "dados obtidos dos sinais vitais (SSVV) do paciente. Vamos lá?"
            ]
        }
    },
    fase1: {
        recepcionista: [
                "Oi! Parece que deu tudo certo com seu primeiro paciente. Parabéns! " +
                "O mentor já te espera para um novo caso.",
            // Jogador
            "Ele deve estar no corredor. Estou indo encontrá-lo,  Clarice."
        ],
        corredor: {
            fala1: [
                // Mentor
                    "Bom dia! Seu segundo paciente tem 69 anos, está acamado e sabemos que isso" +
                    " é um fator de risco para o desenvolvimento de úlcera por pressão, a mudança de posição é" +
                    " essencial!",
                // Jogador
                "Bom dia, Alberto! Vou até a enfermaria conhecê-lo."
            ]
        },
        enfermaria: [
            // Jogador op 1
                "Olá! Sou o técnico de enfermagem cuidarei do Sr. hoje. Como o Sr. está se " +
                "sentindo?",
            // Jogador op 2
            "Bom dia. O senhor está se sentindo bem hoje?",
            //Mentor
            "Você deve se apresentar ao paciente.",
            //Jogador op 3
            "Olá.",
            // Mentor
            "Você deve se apresentar ao paciente e perguntar sobre seu estado de saúde atual.",
            // Paciente
                "Olha, eu poderia estar melhor mas não serviram minha preciosa gelatina " +
                "hoje. HAHAHAHAHA.",
            // Jogador op 1
                "A gelatina daqui é ótima mesmo. O senhor poderia me dizer  seu nome completo e " +
                "data de nascimento, por favor?",
            // Jogador op 2
            "Nome completo, por favor.",
            // Mentor
            "Sua resposta está incompleta. Tente novamente.",
            // Jogador op 3
                "HAHAHA eu não gosto muito, comi uma vez e meu estômago não se acostumou. A comida é ruim, mas vou dar um" +
                "voto de confiança e tentar jantar. Quem sabe dessa vez melhore? Agora preciso de seu nome" +
                "completo e data de nascimento, por favor.",
            // Mentor
            "Não é ético dizer ao paciente sua percepção sobre o hospital.",
            // Paciente
            "Carlos Esme Gouvêa, nasci em 01-12-1945.",
            // Jogador
            "Preciso examiná-lo agora, Sr. Carlos. Com licença."
        ],
        Corredor: [
            // Mentor
            "Você inspecionou a pele do paciente?",
            // Jogador op 1
            "Sim e encontrei algumas regiões hiperemiadas no calcanhar.",
            // Jogador op 2
            "Sim, porém não encontrei nada.",
            // Mentor
            "Você tem certeza?",
            // Jogador op 3
            "Rapidamente e tenho algumas dúvidas.",
            // Mentor
            "A inspeção deve ser minuciosa e requer atenção.",

            // Mentor
                "Isso mesmo! Em casos como este é essencial a mudança de posição (decúbito)" +
                "a cada 2 horas e colocar coxim.",
            // Jogador op 1
            "Vou  procurar no posto de enfermagem imediatamente.",
            // Jogador op 2
            "O que é coxim?",
            // Mentor
            "O coxim é um objeto parecido com um travesseiro.",
            // Jogador op 3
            "Ok.",
            // Mentor
            "O que você deve procurar no posto de enfermagem agora?"
        ]
    },
    fase2: {
        Recepção: [
            // Recepcionista
                "Bom dia! Hoje o mentor não poderá te apresentar seu novo paciente, mas estará aqui" +
                "no hospital caso precise dele. Ele também pediu que você comece pela" +
                "enfermaria masculina. Boa Sorte!"
        ],
        Ala_Masculina: [
            //Jogador
            "Bom dia!",
            // Pacientes
            "Bom dia.",
            // Ação - pegar o prontuário
            // Jogador
                "Parece que temos um procedimento para ser realizado, vou até" +
                "o posto de enfermagem e já volto."
        ],
        Leito_paciente: [
            // Jogador
                "Olá. Sou profissional de enfermagem e preciso fazer alguns testes. Deixe-me" +
                "conferir sua pulseira de identificação, por favor?",
            // Paciente
            "Pero de nuevo?",
            // Jogador
                "É um procedimento padrão. Raul Gonzales, 78 anos, certo? Pelo sotaque dá para perceber" +
                "que o senhor não é daqui. Espanha?",
            // Paciente
            "No no no, soy de mi amada Argentina.",
            // Jogador
                "Justo a Argentina, senhor Raul? Hahaha. Vou verificar sua glicemia para que possamos" +
                "acompanhar a diabetes. Quando precisar se levantar, aperte" +
                "a campainha e terá auxílio imediato.",
            // Mentor
            "Gracias! Soy velho e últimamente já no consigo estar de pie.",

            // Paciente
            "Cuál foi el resultado?",
            // Jogador op 1
            "Não me lembro do valor",
            // Mentor
            "Memorize o valor e tente novamente.",
            // Jogador op 2
            "Sua glicemia está 180 mg/dl. Não se preocupe, está estabilizando.",
            // Jogador op 3
            "240 mg/dl.",
            // Mentor
            " Seu resultado está incorreto. Tente novamente."
        ],
        Corredor: [
            // Jogador
                "Olá, Alberto. A taxa de glicemia  do paciente estava alterada, tornando-o propenso a"+
                "quedas. Ergui a grade do leito e cumpri os procedimentos prescritos.",
            // Mentor
                "O  Núcleo de Segurança do Paciente do nosso hospital orienta a avaliação diária do" +
                "paciente para a diminuição das incidências de quedas. Parabéns pela avaliação."
        ]
    },
    fase3: {},
    fase4: {},
    fase5: {},
    fase6: {},
    fase7: {},
    fase8: {},
    alertas: {
        generico: "Alerta do mentor",
        lavar_maos: {
            tipo1: [
                "Nunca se esqueça de lavar as mãos antes e após tocar o paciente!"
            ],
            tipo2: [
                "Após contato com o paciente, lave as mãos!"
            ],
            tipo3: [
                "Lave as mãos!"
            ]
        },
        enfermaria_masculina: [
            "Volte à Enfermaria Masculina."
        ],
        perdido: {
            enfermagem: [
                "Está perdido? O lugar correto é o posto de enfermagem.",
                "Você tem certeza  de que este é o lugar certo?"
            ],
            ala_feminina:[
                "Esta é a enfermaria correta?"
            ],
            farmácia: [
                "Você precisa encontrar seu paciente primeiro!"
            ]
        },
        esqueceu: {
            coxim: [
                "Você está se esquecendo de algo!"
            ],
            luvas: [
                "Você precisa de proteção para as mãos"
            ],
            algodão: [
                "O algodão seco precisa ser utilizado"
            ],
            teste: [
                "Lembre-se do procedimento a ser realizado"
            ],
            paciente: [
                "O paciente precisa de informações"
            ]
        }
    }
});
