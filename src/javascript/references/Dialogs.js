define({
    tutorial:{
        recepcao:[
            //Recepcionista 
            "Bom dia! Você é novo por aqui? Como posso ajudá-lo?",
            //Jogador
            "Bom dia. Sou o novo técnico de enfermagem.",
            //Recepcionista 
            "Ah, sim! Seja bem vindo! Sou Clarice. O Enfermeiro mentor está te esperando no corredor.",
            //Jogador
            "Obrigado!"
        ],
        corredor:[
            //Mentor
            "Olá! Seja bem-vindo ao Hospital Cuidando Bem! Sou Alberto, seu enfermeiro mentor.  " +            
            "Aqui nossa missão é a garantia da segurança de nossos pacientes através dos protocolos. Você fará um estágio " +
            "de experiência e, caso se saia bem, será contratado em definitivo pelo hospital.",

            //Jogador op 1
            "Obrigado, Alberto! Espero conseguir atender suas expectativas.",
            //Jogador op 2
            "Obrigado. Farei o possível.",
            //Jogador op 3
            "Obrigado, Alberto. Pode contar comigo.",
            //Mentor
            "Agora me acompanhe, começaremos pela enfermaria masculina.",
            //Jogador
            "Vamos lá!"
        ],
        leito:{
            conversa1:[
                //Mentor
                "Este é o Sr. João, seu primeiro paciente. Um dos principais protocolos de segurança" +
                " é a sua apresentação ao paciente e a certificação de que a identificação dele está correta.",
                //Jogador op 1
                "Olá Sr. João. Sou o novo técnico de enfermagem e cuidarei do Sr. hoje. " +
                "Como está se sentindo?",
                //Jogador op 2
                "Olá, sou eu quem cuidará do senhor hoje. Está se sentindo bem?",
                //Mentor
                "Você precisa se apresentar como profissional de enfermagem!",
                //Jogador op 3
                "Olá, senhor João. Sou o técnico de enfermagem recém contratado do hospital, tenho 28 anos e cuidarei" +
                "do senhor hoje. É um prazer conhecê-lo. Como está se sentindo?",
                //Mentor
                "Na sua apresentação teve informações desnecessárias, como a sua idade!",

                //Paciente
                "Estou com muita dor de cabeça e passei muito nervoso hoje, acho que minha" +
                "pressão subiu. É a primeira vez que preciso ser internado em um hospital e estou com um" +
                "pouco de medo.",

                //Jogador op 1
                "Vamos fazer o que for possível para que sua estadia aqui seja rápida e que se sinta " +
                "em casa. Porém, primeiro o seu nome completo e da sua data de nascimento, tudo bem?!",
                //Jogador op 2
                "Preciso do seu nome completo e data de nascimento",
                //Mentor
                "Você não acha que seria necessário compreender melhor o medo do paciente?",
                //Jogador op 3
                "HAHAHA, Fique sussa, seu João, vai pra casa em breve. Mas primeiro preciso" +
                "do seu nome completo e data de nascimento",
                //Mentor
                "Sua resposta foi muito informal!",

                //Paciente
                "Meu nome é João Manoel Ribeiro, nasci no dia 07-06-1956.",

                //Jogador
                "Ok! Obrigado",

                //Mentor
                "Sua primeira missão é admitir o Sr. João nesta enfermaria, identificando-o com uma " +
                "pulseira e verificando os seus sinais vitais. Antes de começar, vá até o posto de enfermagem " +
                "retirar os instrumentos necessários."
            ],
            conversa2:[
                //Paciente op 1
                "Sr. João, esta pulseira agora é a sua identificação aqui dentro do hospital, ela é " +
                "importante para que ninguém o confunda com outro paciente. Daqui em diante quando for " +
                "submetido a um procedimento médico, peça ao profissional de saúde para verificar essa " +
                "identificação. Agora preciso verificar seus sinais vitais, ok?",
                //Paciente op 2
                "Senhor João, a partir de agora fique com esta pulseira de identificação até o fim de sua " +
                "estadia aqui. Vamos fazer alguns procedimentos?",
                //Mentor
                "Você esqueceu de explicar a finalidade da identificação do paciente!",
                //Paciente op 3
                "Senhor João, esta pulseira deve ficar em seu braço até receber alta do hospital. "+
                "Agora vamos verificar seus sinais vitais, ok?",
                //Mentor
                "Resposta incompleta!",
                // Paciente
                "Ok. Obrigado.",
                // Jogador
                "De nada.",
                // Mentor
                "Parabéns, você conseguiu admitir o paciente neste hospital! " +
                "Agora falta algo muito importante: anotar os procedimentos realizados e os "+
                "dados obtidos dos sinais vitais (SSVV) do paciente. Vamos lá?"
            ]
        }
    },
    fase1:{
        recepcao:[
            "Oi! Parece que deu tudo certo com seu primeiro paciente. Parabéns! " +
            "O mentor já te espera para um novo caso.",

            "Vou encontrá-lo no corredor. Obrigado, Clarice."
        ],
        corredor: {
            fala1:[
                "Bom dia! Seu segundo paciente tem 69 anos, está acamado e sabemos que isso" +
                " é um fator de risco para o desenvolvimento de úlcera por pressão, a mudança de posição é" +
                " essencial!",

                "Bom dia! Vou até a enfermaria conhecê-lo."
            ],
            fala2:[
                "Sim e encontrei algumas regiões hiperemiadas no calcanhar.",

                "Isso mesmo! Em casos como este é essencial a mudança de posição (decúbito) a cada " +
                "2 horas e colocar coxim.",

                "Então precisarei de um. Vou ao posto de enfermagem procurar."
            ]
        },
        enfermaria:[
            "Olá! Sou o técnico de enfermagem cuidarei do Sr. hoje. Como o Sr. está se " +
            "sentindo?",

            "Olha, eu poderia estar melhor mas não serviram minha preciosa gelatina " +
            "hoje. HAHAHAHAHA.",

            "HAHAHA a gelatina daqui é ótima mesmo. O sr. poderia me dizer  seu nome completo e " +
            "data de nascimento, por favor?",

            "Carlos Esme Gouvêa, nasci em 01-12-1945.",

            "Preciso examiná-lo agora, Sr. Carlos. Com licença."
        ]
    },
    alertas:{
        generico:"Alerta do mentor",
        lavar_maos: {
            tipo1:[
                "Nunca se esqueça de lavar as mãos antes e após tocar o paciente!",
                "Não posso nunca isso!"
            ],
            tipo2:[
                "Após contato com o paciente lave as mãos!",
                "Sim!"
            ],
            tipo3:[
                "Lave as mãos!",
                "Sim, agora mesmo!"
            ]
        },
        enfermaria_masculina:[
            "Volte à Enfermaria Masculina.",
            "Já volto!"
        ],
        perdido:{
          enfermagem:[
             "Parece estar perdido? É no posto de enfermagem.",
             "Ok!"
          ]
        },
        esqueceu:{
            coxim:[
                "Você está esquecendo de algo!",
                "Falta o coxim!"
            ]
        }
    }
});