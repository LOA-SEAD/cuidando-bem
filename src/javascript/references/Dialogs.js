define({
    tutorial:{
        recepcionista:[
            "Bom dia! Você é novo por aqui? Como posso ajudá-lo?",
            "Bom dia. Sou o novo técnico de enfermagem.",
            "Ah, sim! Seja bem vindo! Sou Clarice. O Enfermeiro mentor está te esperando no corredor.",
            "Obrigado!"
        ],
        corredor:[
            "Olá! Seja bem-vindo ao Hospital Cuidando Bem! Sou Alberto, seu enfermeiro mentor.  " +
            "Aqui nossa missão é a garantia da segurança de nossos pacientes através dos protocolos. Você fará um estágio " +
            "de experiência e, caso se saia bem, será contratado em definitivo pelo hospital.",

            "Obrigado, Alberto! Espero conseguir atender suas expectativas.",
            "Agora me acompanhe, começaremos pela enfermaria masculina.",
            "Vamos lá!"
        ],
        leito:{
            conversa1:[
                "Este é o Sr. João, seu primeiro paciente. Um dos principais protocolos de segurança" +
                " é a sua apresentação ao paciente e a certificação de que a identificação dele está correta.",

                "Olá Sr. João. Sou o novo técnico de enfermagem e cuidarei do Sr. hoje. " +
                "Como está se sentindo?",

                "Estou com muita dor de cabeça e passei muito nervoso hoje, acho que minha" +
                "pressão subiu. É a primeira vez que preciso ser internado em um hospital e estou com um" +
                "pouco de medo.",

                "Vamos fazer o que for possível para que sua estadia aqui seja rápida e que se sinta " +
                "em casa. Porém, primeiro o seu nome completo e da sua data de nascimento, tudo bem?!",

                "Meu nome é João Manoel Ribeiro, nasci no dia 07-06-1956.",

                "Ok! Obrigado",

                "Sua primeira missão é admitir o Sr. João nesta enfermaria, identificando-o com uma " +
                "pulseira e verificando os seus sinais vitais. Antes de começar, vá até o posto de enfermagem" +
                "retirar os instrumentos necessários.",

                "Claro! Agora mesmo."
            ],
            conversa2:[
                "Sr. João, esta pulseira agora é a sua identificação aqui dentro do hospital, ela é " +
                "importante para que ninguém o confunda com outro paciente. Daqui em diante quando for" +
                "submetido a um procedimento médico, peça ao profissional de saúde para verificar essa" +
                "identificação. Agora preciso verificar seus sinais vitais: a pressão arterial, a frequência" +
                "cardíaca, frequência respiratória, saturação de oxigênio e temperatura, ok?",
                // Paciente
                "Ok. Obrigado.",
                // Jogador
                "De nada.",
                // Mentor
                "Parabéns, você conseguiu admitir o paciente neste hospital! Agora falta " +
                "algo muito importante: anotar os procedimentos realizados e os dados obtidos dos sinais vitais " +
                "(SSVV) do paciente. Vamos lá?",
                // Jogador
                "Pode deixar, anotarei imediatamente no prontuário"
            ]
        }
    },
    fase1:{
        recepcionista:[
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