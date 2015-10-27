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
                "Sim e encontrei algumas regiões hiperemiadas no cotovelo.",
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
            "Carlos Esme Gouvêa, nasci em 01/12/1945.",
            //12 Jogador
            "Vou verificar sua pulseira e depois examiná-lo, senhor Carlos. Com licença."
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
            //2 Jogador
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
            //5 Paciente
            "Gracias! Soy velho e últimamente já no consigo estar de pie.",
            //Ação - medir a glicemia
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
                " e verificar com a circulante de sala se todos os equipamentos estão em ordem?",
                // mensagem do mentor em caso de resposta incorreta
                // 5 - resposta a OP2    
                "Imagine  todos  os  riscos  existentes  nos" +
                "procedimentos  cirúrgicos!  A  lista  é  um  das" +
                "estratégias para tentar amenizá-los.",
                // 6 - resposta a OP3
                "A lista  é  uma  estratégia muito  importante  para" +
                "evitar  erros  durante  todo  o  procedimento" +
                "cirúrgico.  É  um  documento  de  extrema importância!"
            ],
            fala2: [
                //0 Jogador
                "Tudo pronto, Alberto, a paciente já está no centro cirúrgico.",
                //1 Mentor
                "Utilizar o protocolo de cirurgia segura é um ganho enorme para nosso hospital e todos os  pacientes." +
                " Parabéns!"
            ]
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
            ]
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
        ]
    },

    fase4: {
        recepcao: [
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
            //Cálculo de medicamento
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
        ]
    },

    fase5: {
        recepcao:[
            //0 Recepcionista
            "Bom tarde! Temos uma paciente à sua espera."
        ],
        corredor: [
            //0 Jogador
            "Boa tarde, Alberto!",
            //1 Mentor
            "Boa tarde! A paciente de hoje teve um Acidente Vascular Encefálico Isquêmico (AVE)." +
            " Ela também sofreu uma queda, resultando em uma lesão. Vá até a enfermaria" +
            " feminina para realizar os procedimentos necessários."
        ],
        ala_feminina: [
            //0 Jogador
            "Boa tarde!",
            //1 Paciente
            "Boa tarde!",
            //2 Jogador
            "Sou da equipe de enfermagem do hospital e realizarei os cuidados esta tarde."
        ],
        leito_paciente: {
            //0 Jogador
            "Antes de começarmos, a senhora poderia me dizer seu nome completo, por favor?",
            //1 Paciente
            "Esther Fidelis.",
            //2 Jogador
            "Senhora Esther, temos dois procedimentos a serem realizados: o primeiro será" +
            " um teste de glicemia capilar. O segundo será um curativo no local machucado pela queda." +
            " A senhora sofreu um acidente vascular, não é mesmo?",
            //3 Paciente
            "Sim. O estress e a correria no Consulado são diárias, eu já esperava que isso talvez" +
            " pudesse acabar acontecendo. Ao menos os movimentos do meu lado direito estão voltando," +
            " tudo estava paralisado. E caso ajude, sou diabética e hipertensa.",
            //4 Jogador op 1 - Certa
            "Realizarei alguns procedimentos, qualquer dúvida basta perguntar." +
            " Além disso, deixarei sua grade sempre erguida; a senhora pode ter" +
            " sensação de desequilíbrio devido à queda e a medicação.",
            //5 Jogador op 2
            "Vou começar a realizar os procedimentos!",
            //6 Mentor - Resposta op 2
            "Você pode fornecer mais informações à paciente."
        }
    },

    fase6: {
        recepcao: [
            //0 Recepcionista
            "Bom dia! O mentor te espera no corredor para a apresentação do seu próximo caso.",
            //1 Jogador
            "Estou indo encontrá-lo, Clarice."
        ],
        corredor: [
            //0 Mentor
            "Bom dia! Hoje seu paciente será o senhor Josivaldo Silva. A alimentação dele" +
            " está sendo realizada através de uma sonda nasogástrica. Lembre-se de que os" +
            " cuidados na administração de dietas são iguais aos da administração de medicamentos.",
            //1 Jogador op 1
            "Sim, Alberto! Antes de administrar qualquer substância, sei que devo" +
            " prestar atenção na conexão correta da sonda.",
            //2 Jogador op 2
            "Sim, Alberto! Não se preocupe, passar uma dieta é simples.",
            //3 Mentor
            "Boa sorte com seu novo paciente!"
        ],
        ala_masculina: [
            //0 Jogador
            "Bom dia! Sou profissional de enfermagem e acompanharei o senhor esta manhã." +
            " Como está se sentindo?",
            //1 Paciente
            "Bom dia! Tô marromeno, mas nada que me aperreie.",
            //2 Jogador op 1
            "Senhor Josivaldo... Seu prontuário tem uma prescrição de dieta," +
            " vou até a farmácia buscar os equipamentos necessários e já volto.",
            //3 Jogador op 2
            "Senhor Josivaldo... Além de sua sonda nasogástrica, por hora não há nada prescrito."
        ],
        farmacia: [
            //0 Jogador op 1
            "Oi, Paulo! Preciso de uma dieta para um paciente que está com sonda nasogástrica.",
            //1 Jogador op 2
            "Oi, Paulo! Me esqueci do que estava anotado na prescrição, aguarde um momento.",
            //2 Farmaceutico
            "A dieta dele foi solicitada ontem e já está preparada. Aqui está.",
            //3 Mentor
            "Você conferiu a dieta corretamente. Parabéns! A partir deste momento, tenha em mente que" +
            " neste hospital usamos equipos de cores específicas para evitar possíveis erros de conexão."
        ],
        posto_enfermagem: [
            //0 Jogador op 1
            "A infusão da dieta ocorrerá em 67 gotas por minuto no período de uma hora.",
            //1 Jogador op 2
            "A infusão da dieta ocorrerá em 33 gotas por minuto no período de uma hora.",
            //2 Jogador op 3
            "A infusão da dieta ocorrerá em 67 gotas no período de uma hora."
        ],
        leite_paciente: [
            //0 Jogador
            "Vou começar a administrar sua dieta, mas antes, por favor, me diga seu nome completo e data de nascimento.",
            //1 Paciente
            "Ôxi! Craro! Mi chamo Josivaldo da Silva, mas não se avexe não, pódi chamá de Valdin." +
            " Nasci no sértão da Paraíba dia 02 de féverero de 1961.",
            //2 Jogador
            "Nordestino, Josivaldo?",
            //3 Paciente
            "Nordéstino, da péxera e carni di sol paraibana, com muito órgulho!",
            //4 Jogador
            "Que legal! Sempre quis conhecer o nordeste brasileiro. Qualquer dúvida ou anormalidade na sonda" +
            " durante a passagem da dieta, basta me avisar e resolverei o problema.",
            //5 Paciente
            "Sim sinhô! Brigado."
        ]
    },

    fase7: {
        recepcao:[
            //0 Jogador
            "Bom dia, Clarice.",
            //1 Recepcionista
            "Bom dia. Uma paciente te espera na enfermaria feminina."
        ],
        enfermaria_feminina: [
            //0 Jogador op 1
            "Bom dia! Faço parte da equipe de enfermagem do hospital e cuidarei de você hoje Como você se chama?",
            //1 Jogador op 2
            "Bom dia! Como se chama?",
            //2 Paciente
            "Ana Beatriz Galvão.",
            //3 Jogador
            "Muito prazer, Ana Beatriz. Você está recebendo medicação antes do café da manhã, certo?",
            //4 Paciente
            "Certo! São para controlar o diabetes.",
            //5 Jogador
            "Vou até a farmácia buscar sua dose de hoje e volto em breve."
        ],
        farmacia: [
            //0 Jogador
            "Bom dia, Paulo! Desta vez preciso de Clorpropamida 250mg para uma paciente diabética.",
            //1 Farmacêutico
            "Aqui está. Venha sempre que precisar.",
            //2 Jogador op 1
            "Desculpe, Paulo,  mas você me entregou Clorpromazina. Eu preciso da Clorpropamida de 250 mg.",
            //3 Jogador op 2
            "Voltarei sim! Até a próxima prescrição.",
            //4 Farmacêutico
            "Me desculpe! Verificarei com mais atenção a dispensação dos medicamentos realizados" +
            " pela equipe aqui da farmácia e afirmo que isto não voltará a se repetir." +
            " Esta é a medicação correta. Você se lembra  da diferença entre elas?",
            //5 Jogador op 1
            "Está tudo bem, sempre verifico a medicação antes de usá-la no paciente." +
            " Não me lembro muito bem das funções, mas está na prescrição e preciso apenas aplicar.",
            //6 Jogador op 2
            "Está tudo bem, sempre verifico a medicação antes de usá-la no paciente." +
            " A Clorpromazina é um antipsicótico que necessita de receituário de controle especial." +
            " Já a clorpropamida é um hipoglicemiante oral."
            ],
        posto_enfermagem: [
            //tabela
        ],
        leito_paciente: [
            //0 Paciente
            "Que bom que voltou, já estou ficando com fome.",
            //1 Jogador
            "Então pode ficar animada, Ana Beatriz. Eu trouxe sua medicação.",
            //2 Paciente
            "Animada vou ficar quando puder voltar para meu computador trabalhar." +
            " Não terminei a edição de um comercial, meu chefe deve estar furioso!",
            //3 Jogador op 1
            "Você trabalha com publicidade? Muito legal! Agora lembre-se: A clorpropamida reduz" +
            " o índice de glicose no seu organismo, caso sinta algo fora do comum me avise.",
            //4 Jogador op 2
            "Você trabalha com publicidade? Muito legal! Me chame se precisar de algo.",
            //5 Paciente
            "Ok! Te chamarei caso eu precise.",
            //6 Jogador
            "Em breve será liberada e poderá voltar para seu trabalho. Aproveite o café da manhã.",
            //7 Paciente
            "Obrigada."
        ],
        ala_feminina: [
            //tabela
        ]
    },

    fase_final: {
        recepcao: [
            //0 Recepcionista
            "Boa noite! Hoje será seu último teste antes de oficialmente fazer parte da" +
            " equipe do Cuidando Bem. Seu mentor não poderá lhe apresentar os dois" +
            " pacientes que estão à sua espera. Vamos as informações?",
            //1 Jogador
            "Boa noite, Clarice! Pode começar.",
            //2 Recepcionista
            "Ambos pacientes estão na enfermaria masculina. Um é o Yuri, está aguardando a realização de uma" +
            " cirurgia agendada para esta noite; o outro é o Francisco, tem reposição hidroeletrolítica" +
            " prescrita. Sua contratação dependerá de sua escolha de prioridade e qualidade de atendimento." +
            " Boa sorte!"
        ]
    },

    fase8:{
        ala_masculina: [
            //0 Jogador
            "Boa noite! Sou responsável por levá-lo até o centro cirúrgico. Como é o seu nome?",
            //1 Paciente
            "Boa noite! Sou Yuri.",
            //2 Jogador
            "O que aconteceu com você?",
            //3 Paciente
            "Bom... Parece que rompi o ligamento do joelho, mas foi mancada minha." +
            " Cruzei o sinal no amarelo, uma van me fechou e caí da moto.",
            //4 Jogador
            "Por sorte foi apenas o joelho. Antes de irmos ao centro cirúrgico," +
            " vou até a farmácia buscar o medicamento que você precisará tomar. Está nervoso?",
            //5 Paciente
            "Nervoso não, um pouco ansioso, eu diria. E talvez com um pouco de medo, nunca fiz uma cirurgia.",
            //6 Jogador
            "Fique calmo, Yuri, vai dar tudo certo!"
        ],
        farmacia: [
            //0 Farmaceutico
            "Olá! Do que precisa hoje?",
            //1 Jogador
            "Oi, Paulo! Preciso de Midazolan de 15 mg.",
            //2 Farmaceutico
            "Aqui está!"
        ],
        leito_paciente: [
            //0 Jogador
            "Yuri, esta medicação se chama Midazolan. Ela serve para sedar o paciente" +
            " antes de darmos início aos procedimentos cirúrgicos. Você poderia me falar" +
            " seu nome completo e mostrar a pulseira de identificação, por favor?",
            //1 Paciente
            "Ok. Yuri de Souza Almeida.",
            //2 Jogador
            "Certo, Yuri. Por favor tome a medicação e iremos para o centro cirúrgico em seguida."
        ],
        centro_cirurgico: [
            //0 Jogador op 1
            "Boa noite, Aline! Trouxe o paciente da  próxima cirurgia. Você precisa de ajuda?",
            //1 Jogador op 2
            "Boa noite, Aline! Trouxe um paciente para cirurgia. Antes de começarmos os procedimentos" +
            " cirúrgicos, posso checar os equipamentos e fazer a lista de verificação?",
            //2 Circulante da sala
            "Bom noite. Claro! Fique à vontade.",
            //3 Jogador
            "Yuri, vou te fazer algumas perguntas para verificar se está tudo em ordem" +
            " antes da indução anestésica. Tudo bem?",
            //4 Paciente
            "Sem problemas. Pode mandar.",
            //5 Jogador
            "Nome completo?",
            //6 Paciente
            "Yuri de Souza Almeida.",
            //7 Jogador
            "Idade e profissão?",
            //8 Paciente
            "22, futuro engenheiro civil, se Deus quiser e o trânsito deixar.",
            //9 Jogador
            "Hahaha. Em qual parte do corpo será feita a cirurgia?",
            //10 Paciente
            "Na perna direita.",
            //11 Jogador
            "Qual procedimento?",
            //12 Paciente
            "Não tenho muita certeza….Acho que é uma cirurgia do ligamento ...cruzado anterior.",
            //13 Jogador
            "Você assinou o termo de consentimento?",
            //14 Paciente
            "Sim.",
            //15 Jogador
            "Você tem alguma alergia conhecida?",
            //16 Paciente
            "Sou... alér...gico a dipiro...na e …. sulfa.",
            //17 Jogador
            "A anestesia já começou a fazer efeito. Esta é a circulante de sala Aline," +
            " ela cuidará de você a partir de agora. Boa cirurgia, Yuri!"
        ]
    },

    fase9: {
        ala_masculina: [
            //0 Jogador op 1
            "Bom dia! Sou profissional de enfermagem deste hospital e cuidarei do senhor hoje." +
            " Qual seu nome e como se sente esta manhã?",
            //1 Jogador op 2
            "Bom dia! Vim para cuidar do senhor esta manhã.",
            //2 Paciente
            "Francisco Rodrigues, ao seu dispor. Tô bem não, tô meio mole.",
            //3 Jogador
            "O senhor parece muito desidratado. Vou até a farmácia buscar o soro prescrito" +
            " pelo médico e, assim que eu voltar, verificaremos seus sinais vitais.",
            //4 Paciente
            "Tá certo! Brigado."
        ],
        farmacia: [
            //0 Farmaceutico
            "Mais um paciente?",
            //1 Jogador
            "Sim, Paulo. E desta vez preciso de Soro glicosado  5% - 1000ml e NaCl 20 %- 20 ml.",
            //2 Farmaceutico
            "Aqui está. Boa sorte!"
        ],
        leito_paciente: [
            //0 Jogador
            "Senhor Francisco, antes de começarmos, o senhor poderia me dizer sua" +
            " data de nascimento e me deixar verificar sua pulseira de identificação?",
            //1 Paciente
            "Sí. 02 de deciembro de 1937.",
            //2 Jogador
            "Opa! Senhor Raul? Porque está no leito do senhor Francisco?",
            //3 Paciente
            "Trocámos de cama, no és possible assistir a la pelicula daquele lado!",
            //4 Jogador op 1
            "Desculpe senhor Raul, mas por medidas de segurança os pacientes não podem trocar de leito." +
            " Conseguiremos encontrar uma maneira em que o senhor consiga assistir" +
            " à televisão daquela cama.Vamos destrocar?",
            //5 Jogador op 2
            "Tudo bem, senhor Raul, porém deixarei apenas desta vez, ok?!"
        ],
        ala_masculina: [
            //0 Jogador
            "Agora estamos no leito correto, senhor Francisco.",
            //1 Paciente
            "Desculpa aí pela confusão, pensei que pudia mudar de cama." +
            " O argentino queria ver a novela e essa aqui tá me dando dor nas costas…" +
            " ou pode ser por causa do caminhão. Achei melhor trocar pra ter certeza.",
            //2 Jogador
            "O senhor é caminhoneiro? Suas dores nas costas realmente podem ser consequência" +
            " de sua posição lombar ao dirigir. Vou pedir para a manutenção verificar sua cama e," +
            " caso seja necessário, ela será substituída. Vamos checar seus sinais vitais?",
            //3 Paciente
            "Sou sim. Brigada pela ajuda e pode medir o que precisar aí, tenho que ficar bom rápido.",
            //4 Jogador
            "Falta apenas a infusão do soro. Qualquer desconforto basta me avisar, ok?!"
        ]
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
                // 0 op 1
                "Está perdido? O lugar correto é o posto de enfermagem.",
                // 1 op 2
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
                // 0 - Fase 2
                "Lembre-se do procedimento a ser realizado",
                // 1 - Fase 5 (Tanto o de glicemia como fazer o curativo)
                "Falta um item da prescrição de enfermagem. Tente novamente."
            ],
            paciente: [
                "O paciente precisa de informações"
            ],
            objeto_qualquer: [
                "Volte ao posto de enfermagem, você se esqueceu de alguns instrumentos."
            ],
            elevar_grade: [
                //0 - Paciente homem
                "Previna o paciente de futuras quedas! Pense e encontre a solução.",
                //1 - Paciente mulher
                "Previna a paciente de futuras quedas! Pense e encontre a solução."
            ],
            falar_paciente: [
                "Tente conversar com a paciente."
            ],
            ver_pulseira: [
                "Nunca se esqueça de verificar a identificação da paciente!"
            ],
            materiais_curativo: [
                "Onde estão os materiais do curativo?"
            ],
            luvas_estereis: [
                "Luvas estéreis são essenciais!"
            ],
            identificar_curativo: [
                "Todo curativo precisa ser identificado!"
            ],
            anotar_prontuario: [
                "O prontuário está vazio. Que tal fazer algumas anotações?"
            ]
            //informar_paciente (Level 5) -> Este ainda não encontrei onde será utilizado
        },
        descarte: {
            algodão: [
                // 0 Descarte na bandeja
                "O algodão deve ser descartado na bandeja antes de ir para um depósito mais adequado."
                // 1 Descarte no lixo branco

            ],
            agulha: [
                "Faça o descarte da agulha em local adequado para evitar acidentes de trabalho."
            ]
        },
        luvas_erradas: [
            "Esta realmente é a luva utilizada para curativos?"
        ]
    }
});
