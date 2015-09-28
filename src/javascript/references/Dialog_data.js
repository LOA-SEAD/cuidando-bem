/**
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define({
    tutorial: {
        recepcao: [
            //0 Recepcionista
            "Bom dia! Ainda não conheço você. Como posso ajudar?",
            //1 Jogador
            "Bom dia. Sou profissional de enfermagem e hoje é meu primeiro dia de trabalho.",
            //2 Recepcionista
            "Ah, sim! Sou Clarice, a recepcionista. O Enfermeiro mentor está te esperando no corredor."
        ],
        corredor: [
            //0 Mentor
            "Olá! Toda a equipe do Hospital Cuidando Bem te deseja boas vindas! Sou Alberto, seu enfermeiro mentor." +
            " Aqui nossa missão é a garantia da segurança de nossos pacientes através dos protocolos. Você fará um estágio" +
            " de experiência e, caso se saia bem, seu contrato será definitivo.",
            //1 Jogador op 1
            "Agradeço, Alberto! Espero conseguir atender suas expectativas.",
            //2 Jogador op 2
            "Preciso começar agora?",
            //3 Mentor
            "Esteja sempre preparado para o trabalho",
            //4 Jogador op 3
            "Agradeço, Alberto, mas tenho certeza que posso trabalhar sem sua supervisão.",
            //5 Mentor
            "Sempre aceite ajuda de um profissional mais experiente.",
            //6 Mentor
            "Agora me acompanhe, começaremos pela enfermaria masculina."
        ],
        leito: {
            perguntarNome: "Me desculpe, mas poderia repetir seu nome completo e sua data de nascimento?",
            conversa1: [
                //0 Mentor
                "Este é o Sr. João, seu primeiro paciente. Um dos principais protocolos de segurança" +
                " é a sua apresentação ao paciente e a certificação de que a identificação dele está correta.",
                //1 Jogador op 1
                "Olá Sr. João. Sou profissional de enfermagem e cuidarei do Sr. hoje." +
                " Como está se sentindo?",
                //2 Jogador op 2
                "Olá, sou eu quem cuidará do senhor hoje. Está se sentindo bem?",
                //3 Mentor
                "Você precisa se apresentar como profissional de enfermagem!",
                //4 Jogador op 3
                "Olá, senhor João. Sou profissional de enfermagem do hospital, tenho 28 anos e cuidarei" +
                " do senhor hoje. É um prazer conhecê-lo. Como está se sentindo?",
                //5 Mentor
                "Sua apresentação contém informações desnecessárias.",
                //6 Paciente
                "Estou com muita dor de cabeça e passei muito nervoso hoje, acho que minha pressão subiu" +
                " É a primeira vez que preciso ser internado em um hospital e estou com um pouco de medo.",
                //7 Jogador op 1
                "Vamos fazer o possível para que sua estadia aqui seja rápida e que se sinta em casa." +
                " Porém, primeiro preciso do seu nome completo e da sua data de nascimento, tudo bem?!",
                //8 Jogador op 2
                " Vamos fazer o possível para que se sinta confortável.",
                //9 Mentor
                "Você precisa das informações sobre o paciente.",
                //10 Jogador op 3
                "HAHAHA fique sussa, seu João, o senhor vai pra casa em breve. Mas primeiro preciso" +
                " dos seus dados.",
                //11 Mentor
                "Sua resposta está vaga e informal. Você pode melhorar!",
                //12 Paciente
                "Meu nome é João Manoel Ribeiro, nasci no dia 07/06/1956.",
                //13 Jogador
                " Está certo, seu João. Já tenho todas as informações de que preciso ",
                //14 Mentor
                "Sua primeira missão é admitir o Sr. João nesta enfermaria, identificando-o" +
                " com uma pulseira e verificando os seus sinais vitais. Antes de começar," +
                " vá até o posto de enfermagem retirar os instrumentos necessários."
            ],
            conversa2: [
                //0 Jogador op 1
                "Sr. João, esta pulseira agora é a sua identificação aqui dentro do hospital. Ela é importante para" +
                " que ninguém o confunda com outro paciente. Daqui em diante, quando for submetido a um procedimento" +
                " médico, peça ao profissional de saúde para verificar essa identificação." +
                " Agora preciso verificar seus sinais vitais, ok?",
                //1 Jogador op 2
                "Senhor João, fique com esta pulseira de identificação até o fim de sua" +
                " estadia aqui. Vamos realizar alguns procedimentos médicos?",
                //2 Mentor
                "Você deve explicar ao paciente a função da pulseira de identificação.",
                //3 Jogador op 3
                "Senhor João, vamos verificar seus sinais vitais?",
                //4 Mentor
                "Não se esqueça: A pulseira de identificação é importante!",
                //5 Paciente
                "Ok. Obrigado.",
                //6 Jogador
                "De nada.",
                //7 Mentor
                "Parabéns, você conseguiu admitir o paciente neste hospital! Agora falta algo muito importante:" +
                " anotar os procedimentos realizados e os dados obtidos dos sinais vitais (SSVV) do paciente. Vamos lá?"
            ],
            pulseira_incorreta: "Você tem certeza que as informações do paciente estão corretas?"
        }
    },
    fase1: {
        recepcao: [
            //0 Recepcionista
            "Oi! Parece que deu tudo certo com seu primeiro paciente. Parabéns!" +
            " O mentor já te espera para um novo caso.",
            //1 Jogador
            "Ele deve estar no corredor. Estou indo encontrá-lo, Clarice."
        ],
        corredor: {
            fala1: [
                //0 Mentor
                "Bom dia! Seu segundo paciente tem 69 anos, está acamado e sabemos que isso é um fator de" +
                " risco para o desenvolvimento de úlcera por pressão, a mudança de posição é essencial!",
                //1 Jogador
                "Bom dia, Alberto! Vou até a enfermaria conhecê-lo."
            ],
            fala2: [
                //0 Mentor
                "Você inspecionou a pele do paciente?",
                //1 Jogador op 1
                "Sim e encontrei algumas regiões hiperemiadas no calcanhar.",
                //2 Jogador op 2
                "Sim, porém não encontrei nada.",
                //3 Mentor
                "Você tem certeza?",
                //4 Jogador op 3
                "Rapidamente e tenho algumas dúvidas.",
                //5 Mentor
                "A inspeção deve ser minuciosa e requer atenção.",
                //6 Mentor
                "Isso mesmo! Em casos como este é essencial a mudança de posição (decúbito)" +
                " a cada 2 horas e colocar coxim.",
                //7 Jogador op 1
                "Vou  procurar no posto de enfermagem imediatamente.",
                //8 Jogador op 2
                "O que é coxim?",
                //9 Mentor
                "O coxim é um objeto parecido com um travesseiro.",
                //10 Jogador op 3
                "Ok.",
                //11 Mentor
                "O que você deve procurar no posto de enfermagem agora?"
            ]
        },
        perguntarNome: "Me desculpe, mas poderia repetir seu nome completo e sua data de nascimento?",
        enfermaria: [
            //0 Jogador op 1
            "Olá! Sou o técnico de enfermagem cuidarei do Sr. hoje. Como o Sr. está se sentindo?",
            //1 Jogador op 2
            "Bom dia. O senhor está se sentindo bem hoje?",
            //2 Mentor
            "Você deve se apresentar ao paciente.",
            //3 Jogador op 3
            "Olá.",
            //4 Mentor
            "Você deve se apresentar ao paciente e perguntar sobre seu estado de saúde atual.",
            //5 Paciente
            "Olha, eu poderia estar melhor mas não serviram minha preciosa gelatina hoje. HAHAHAHAHA.",
            //6 Jogador op 1
            "A gelatina daqui é ótima mesmo. O senhor poderia me dizer" +
            " seu nome completo e data de nascimento, por favor?",
            //7 Jogador op 2
            "Nome completo, por favor.",
            //8 Mentor
            "Sua resposta está incompleta. Tente novamente.",
            //9 Jogador op 3
            "HAHAHA eu não gosto muito, comi uma vez e meu estômago não se acostumou. A comida é ruim," +
            " mas vou dar um voto de confiança e tentar jantar. Quem sabe dessa vez melhore?" +
            " Agora preciso de seu nome completo e data de nascimento, por favor.",
            //10 Mentor
            "Não é ético dizer ao paciente sua percepção sobre o hospital.",
            //11 Paciente
            "Carlos Esme Gouvêa, nasci em 01-12-1945.",
            //12 Jogador
            "Vou verificar sua pulseira e depois examiná-lo, senhor Carlos. Com licença."
        ],
        Corredor: [

        ]
    },
    fase2: {
        recepcao: [
            //0 Recepcionista
            "Bom dia! Hoje o mentor não poderá te apresentar seu novo paciente, mas estará aqui no hospital" +
            " caso precise dele. Ele também pediu que você comece pela enfermaria masculina. Boa Sorte!"
        ],
        ala_masculina: [
            //0 Jogador
            "Bom dia!",
            //1 Paciente
            "Bom dia.",
            // Ação - pegar o prontuário
            //3 Jogador
            "Parece que temos um procedimento para ser realizado, vou até o posto de enfermagem e já volto."
        ],
        leito_paciente: [
            //0 Jogador
            "Olá. Sou profissional de enfermagem e preciso fazer alguns testes." +
            " Deixe-me conferir sua pulseira de identificação, por favor?",
            //1 Paciente
            "Pero de nuevo?",
            //2 Jogador
            "É um procedimento padrão. Raul Gonzales, 78 anos, certo?" +
            " Pelo sotaque dá para perceber que o senhor não é daqui. Espanha?",
            //3 Paciente
            "No no no, soy de mi amada Argentina.",
            //4 Jogador
            "Justo a Argentina, senhor Raul? Hahaha. Vou verificar sua glicemia para que possamos acompanhar" +
            " a diabetes. Quando precisar se levantar, aperte a campainha e terá auxílio imediato.",
            //5 Mentor
            "Gracias! Soy velho e últimamente já no consigo estar de pie.",
            //6 Paciente
            "Cuál foi el resultado?",
            //7 Jogador op 1
            "Não me lembro do valor",
            //8 Mentor
            "Memorize o valor e tente novamente.",
            //9 Jogador op 2
            "Sua glicemia está 180 mg/dl. Não se preocupe, está estabilizando.",
            //10 Jogador op 3
            "240 mg/dl.",
            //11 Mentor
            " Seu resultado está incorreto. Tente novamente."
        ],
        corredor: [
            //0 Jogador
            "Olá, Alberto. A taxa de glicemia  do paciente estava alterada, tornando-o propenso a" +
            " quedas. Ergui a grade do leito e cumpri os procedimentos prescritos.",
            //1 Mentor
            "O  Núcleo de Segurança do Paciente do nosso hospital orienta a avaliação diária do" +
            " paciente para a diminuição das incidências de quedas. Parabéns pela avaliação."
        ]
    },
    fase3: {
        recepcao: [
            //0 Recepcionista
            "Bom dia! O mentor lhe espera no corredor."
        ],
        corredor: {
            fala1: [
                //0 Mentor
                "Olá! Estamos prestes a entrar no centro cirúrgico. Você será responsável pela aplicação" +
                " da primeira fase da lista de verificação de segurança cirúrgica. Porém, antes de começarmos," +
                " você sabe qual a importância da aplicação desta lista?",
                //1 Jogador op 1
                "Claro! Ela é utilizada para reduzir os riscos de incidentes cirúrgicos.",
                //2 Jogador op 2
                "Desculpe, não sei o porquê devo utilizá-la.",
                //3 Jogador op 3
                "É  apenas um papel a ser preenchido, sem muita importância.",
                //4 Mentor
                "Muito bem! Antes de levar a paciente para a cirurgia, você deve ir ao centro cirúrgico" +
                " e verificar com a circulante de sala se todos os equipamentos estão em ordem?"
            ],
            fala2: [
                //0 Jogador
                "Tudo pronto, Alberto, a paciente já está no centro cirúrgico.",
                //1 Mentor
                "Utilizar o protocolo de cirurgia segura é um ganho enorme para nosso hospital e todos os  pacientes." +
                " Parabéns!"
            ],
        },
        centro_cirurgico: {
            fala1: [
                //0 Aline
                "Bom dia! Você  encaminhará a paciente ao centro cirúrgico?",
                //1 Jogador op 1
                "Sim! Mas antes, o mentor Alberto me pediu para verificar os equipamentos da sala com você.",
                //2 Jogador op 2
                "Não, ainda não a conheci!",
                //3 Jogador op 3
                "Sim, já vou buscá-la.",
                //4 Jogador
                "Terminamos, Aline. Vou buscar a paciente."
            ],
            fala2: [
                //0 Aline
                "Você sabe em qual momento precisará realizar a primeira" +
                " fase da lista de verificação de segurança cirúrgica?",
                //1 Jogador op 1
                "Claro! A primeira fase é antes da indução anestésica.",
                //2 Jogador op 2
                "Claro! A primeira fase é antes da incisão cirúrgica.",
                //3 Jogador op 3
                "Claro! A primeira fase é antes do paciente sair da sala de operação.",
                //4 Jogador
                "Regina, preciso fazer algumas perguntas antes da indução anestésica, tudo bem?" +
                " Apenas para verificar se está tudo em ordem.",
                //5 Paciente
                "Magina! Pode fazer quantas perguntas quiser.",
                //6 Jogador
                "Seu nome?",
                //7 Paciente
                "Regina Oliveira",
                //8 Jogador
                "Parte do corpo em que será feita a cirurgia?",
                //9 Paciente
                "Pé esquerdo.",
                //10 Jogador
                "Qual procedimento será realizado?",
                //11 Paciente
                "Num sei o nome direito, acho que é amputação transtártica ou coisa parecida." +
                " Ah, vão colocar enxerto também.",
                //12 Jogador
                "Certo! O nome do procedimento é Amputação transmetatársica à esquerda e Enxerto Poplíteo." +
                " A senhora assinou o termo de consentimento?",
                //13 Paciente
                "Sim.",
                //14 Jogador
                "A senhora possui algum tipo de alergia?",
                //15 Paciente
                "Que eu saiba, não.",
                //16 Jogador op 1
                "Tudo certo até agora, Regina. Agora preciso verificar o oxímetro de pulso e o local da cirurgia.",
                //17 Jogador op 2
                "Tudo certo até agora, Regina. Vamos para a sala de cirurgia?",
                //18 Jogador op 3
                "Desculpe, Regina, preciso fazer mais algumas perguntas."
            ],
        },
        ala_feminina: [
            //tabela
        ],
        leito_paciente: [
            //0 Jogador
            "Bom dia! Sou profissional de enfermagem e levarei a senhora para a sala de cirurgia." +
            " Qual é o seu nome?",
            //1 Paciente
            "Bom dia! Regina Oliveira, muito prazer.",
            //2 Jogador
            "O prazer é meu. A senhora está agendada para uma cirurgia hoje, certo?!" +
            " Como está se sentindo?",
            //3 Paciente
            "Certo. Tô um tiquinho nervosa, pra mim agulha só é boa com linha.",
            //4 Jogador
            "A senhora costura? Que legal! Fique tranquila, Regina, estamos cuidando de todos os detalhes de sua cirurgia." +
            " A senhora não pode entrar no centro cirúrgico com adornos ou próteses. Está ou tem algo do gênero?",
            //5 Paciente
            "Num tô não! Minha filha já tá com tudinho lá fora."
        ],
    },
    fase4: {
        corredor: [
        //0 Jogador
        "Bom dia, Clarice.",
        //1 Clarice
        "Bom dia! O paciente já está à sua espera."
        ],
        ala_masculina: [
        //0 Jogador
        "Bom dia! Sou profissional de enfermagem e atenderei o senhor hoje. Deixe-me ver seu prontuário...",
        //1 Paciente
        "Bom dia. Hora da medicação? Qual é a de hoje?",
        //2 Jogador op 1
        "Sim senhor! Ainda é o segundo dia de uso do Keflin. Vou preparar sua medicação e já volto.",
        //3 Jogador op 2
        "Sim, mas o nome da medicação não é uma informação importante, não se preocupe.",
        //4 Jogador op 3
        "Não sei dizer, não há nada anotado no prontuário."
        ],
        farmacia: [
        //0 Paulo
        "Bom dia! Do que precisa?",
        //1 Jogador
        "Bom dia, Paulo! Vim buscar o medicamento prescrito para um paciente da enfermaria masculina." +
        " Aqui está o prontuário.",
        //2 Paulo
        "Pronto. Este é o frasco de Keflin, sua apresentação é de 1g.",
        //3 Jogador
        "Agradeço, Paulo! Preciso voltar ao paciente."
        ],
        posto_enfermagem: [
        //Cálculo de medicamente
        //0 Jogador
        "Acredito que peguei tudo o que precisava.",
        //1 Mentor
        "Muito bem! Vamos conferir se a medicação dispensada é a mesma prescrita."
        ],
        leito_paciente: [
        //0 Jogador
        "Voltei. Antes da administração do medicamento, o senhor poderia me dizer" +
        " seu nome e data de nascimento, por favor?",
        //1 Paciente
        "Claro. Pedro Alcídes Mendonça, nasci em 03 de junho de 1962.",
        //2 Jogador op 1
        "Senhor Pedro, este medicamento é o Keflin; sua ação é antimicrobiana" +
        " e ele vai correr no período de uma hora, tudo bem?",
        //3 Jogador op 2
        "Senhor Pedro, vou administrar o medicamento. Tudo bem?",
        //4 Jogador op 3
        "Senhor Pedro, vou administrar o medicamento. Caso queira saber sua função," +
        " pergunte ao médico responsável e ele saberá te informar.",
        //5 Paciente
        "Muito obrigado. E me desculpe pelas perguntas, é mania de professor.",
        //6 Jogador
        "Hahaha. Sem problemas. Se sentir qualquer sensação estranha é só me comunicar." +
        " Por favor, não abra a pinça do equipo e em breve poderá voltar para seus alunos.",
        //7 Mentor
        "Lembre-se sempre de utilizar os nove certos na administração de medicamentos!" +
        " Deste modo reduzimos a possibilidades de erros."
        ],
    },
    fase5: {

    },
    fase6: {

    },
    fase7: {

    },
    fase8: {

    },
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
