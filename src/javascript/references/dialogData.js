/*
 This file is part of Cuidando Bem.
 Cuidando Bem is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 Cuidando Bem is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define({
  fase1: {
    recepcao: [
      // 0 Recepcionista
      "Bom dia! Ainda não conheço você. Como posso ajudar?",
      // 1 Jogador
      "Bom dia. Sou profissional de enfermagem e hoje é meu primeiro dia de trabalho.",
      // 2 Recepcionista
      "Ah, sim! Sou Clarice, a recepcionista. O Enfermeiro mentor está te esperando no corredor."
    ],
    corredor: [
      // 0 Mentor
      "Olá! Toda a equipe do Hospital Cuidando Bem te deseja boas vindas! Sou Alberto, seu enfermeiro mentor." +
      " Aqui nossa missão é a garantia da segurança de nossos pacientes através dos protocolos. Você fará um estágio" +
      " de experiência e, caso se saia bem, seu contrato será definitivo.",
      // 1 Jogador op 1
      "Agradeço, Alberto! Espero conseguir atender suas expectativas.",
      // 2 Jogador op 2
      "Preciso começar agora?",
      // 3 Mentor
      "Esteja sempre preparado para o trabalho",
      // 4 Jogador op 3
      "Agradeço, Alberto, mas tenho certeza que posso trabalhar sem sua supervisão.",
      // 5 Mentor
      "Sempre aceite ajuda de um profissional mais experiente.",
      // 6 Mentor
      "Agora me acompanhe, começaremos pela enfermaria masculina."
    ],
    leito: {
      perguntarNome: "Me desculpe, mas poderia repetir seu nome completo e sua data de nascimento?",
      conversa1: [
        // 0 Mentor
        "Este é o Sr. João, seu primeiro paciente. Um dos principais protocolos de segurança" +
        " é a sua apresentação ao paciente e a certificação de que a identificação dele está correta.",
        // 1 Jogador op 1
        "Olá Sr. João. Sou profissional de enfermagem e cuidarei do Sr. hoje." +
        " Como está se sentindo?",
        // 2 Jogador op 2
        "Olá, sou eu quem cuidará do Sr. hoje. Está se sentindo bem?",
        // 3 Mentor
        "Você precisa se apresentar como profissional de enfermagem!",
        // 4 Jogador op 3
        "Olá, Sr. João. Sou profissional de enfermagem do hospital, tenho 28 anos e cuidarei" +
        " do Sr. hoje. É um prazer conhecê-lo. Como está se sentindo?",
        // 5 Mentor
        "Sua apresentação contém informações desnecessárias.",
        // 6 Paciente
        "Estou com muita dor de cabeça e passei muito nervoso hoje, acho que minha pressão subiu." +
        " É a primeira vez que preciso ser internado em um hospital e estou com um pouco de medo.",
        // 7 Jogador op 1
        "Vamos fazer o possível para que sua estadia aqui seja rápida e que se sinta em casa." +
        " Porém, primeiro preciso do seu nome completo e da sua data de nascimento, tudo bem?!",
        // 8 Jogador op 2
        " Vamos fazer o possível para que se sinta confortável.",
        // 9 Mentor
        "Você precisa das informações sobre o paciente.",
        // 10 Jogador op 3
        "HAHAHA fique sussa, Sr. João, o Sr. vai pra casa em breve. Mas primeiro preciso" +
        " dos seus dados.",
        // 11 Mentor
        "Sua resposta está vaga e informal. Você pode melhorar!",
        // 12 Paciente
        "Meu nome é João Manoel Ribeiro, nasci no dia 07/06/1956.",
        // 13 Jogador
        " Está certo, Sr. João. Já tenho todas as informações de que preciso.",
        // 14 Mentor
        "Sua primeira missão é admitir o Sr. João nesta enfermaria, identificando-o" +
        " com uma pulseira e verificando seus sinais vitais. Vamos lá?"
      ],
      conversa2: [
        // 0 Jogador op 1
        "Sr. João, esta pulseira agora é a sua identificação aqui dentro do hospital. Ela é importante para" +
        " que ninguém o confunda com outro paciente. Daqui em diante, quando for submetido a um procedimento" +
        " médico, peça ao profissional de saúde para verificar essa identificação." +
        " Agora preciso verificar seus sinais vitais, ok?",
        // 1 Jogador op 2
        "Sr. João, fique com esta pulseira de identificação até o fim de sua" +
        " estadia aqui. Vamos realizar alguns procedimentos médicos?",
        // 2 Mentor
        "Você deve explicar ao paciente a função da pulseira de identificação.",
        // 3 Jogador op 3
        "Sr. João, vamos verificar seus sinais vitais?",
        // 4 Mentor
        "Não se esqueça: A pulseira de identificação é importante!",
        // 5 Paciente
        "Ok. Obrigado.",
        // 6 Jogador
        "De nada.",
        // 7 Mentor
        "Parabéns, você conseguiu admitir o paciente neste hospital! Agora falta algo muito importante:" +
        " anotar os procedimentos realizados e os dados obtidos dos sinais vitais (SSVV) do paciente." +
        " Antes de começar, vá até o posto de enfermagem retirar os instrumentos necessários."
      ],
      pulseiraIncorreta: "Você tem certeza que as informações do paciente estão corretas?"
    }
  },

  fase2: {
    recepcao: [
      // 0 Recepcionista
      "Oi! Parece que deu tudo certo com seu primeiro paciente. Parabéns!" +
      " O mentor já te espera para um novo caso.",
      // 1 Jogador
      "Ele deve estar no corredor. Estou indo encontrá-lo, Clarice."
    ],
    corredor: {
      fala1: [
        // 0 Mentor
        "Bom dia! Seu segundo paciente tem 69 anos, está acamado e sabemos que isso é um fator de" +
        " risco para o desenvolvimento de úlcera por pressão. A mudança de posição é essencial!",
        // 1 Jogador
        "Bom dia, Alberto! Vou até a enfermaria conhecê-lo."
      ],
      fala2: [
        // 0 Mentor
        "Você inspecionou a pele do paciente?",
        // 1 Jogador op 1
        "Sim e encontrei algumas regiões hiperemiadas no cotovelo.",
        // 2 Jogador op 2
        "Sim, porém não encontrei nada.",
        // 3 Mentor
        "Você tem certeza?",
        // 4 Jogador op 3
        "Rapidamente e tenho algumas dúvidas.",
        // 5 Mentor
        "A inspeção deve ser minuciosa e requer atenção.",
        // 6 Mentor
        "Isso mesmo! Em casos como este é essencial a mudança de posição (decúbito)" +
        " a cada 2 horas e colocar coxim.",
        // 7 Jogador op 1
        "Vou  procurar no posto de enfermagem imediatamente.",
        // 8 Jogador op 2
        "O que é coxim?",
        // 9 Mentor
        "O coxim é um objeto parecido com um travesseiro.",
        // 10 Jogador op 3
        "Ok.",
        // 11 Mentor
        "O que você deve procurar no posto de enfermagem agora?"
      ]
    },
    perguntarNome: "Me desculpe, mas poderia repetir seu nome completo e sua data de nascimento?",
    enfermaria: [
      // 0 Jogador op 1
      "Olá! Sou profissional de enfermagem e cuidarei do Sr. hoje. Como o está se sentindo?",
      // 1 Jogador op 2
      "Bom dia. O Sr. está se sentindo bem hoje?",
      // 2 Mentor
      "Você deve se apresentar ao paciente.",
      // 3 Jogador op 3
      "Olá.",
      // 4 Mentor
      "Você deve se apresentar ao paciente e perguntar sobre seu estado de saúde atual.",
      // 5 Paciente
      "Olha, eu poderia estar melhor, mas não serviram minha preciosa gelatina hoje. HAHAHAHAHA.",
      // 6 Jogador op 1
      "A gelatina daqui é ótima mesmo. O Sr. poderia me dizer" +
      " seu nome completo e data de nascimento, por favor?",
      // 7 Jogador op 2
      "Nome completo, por favor.",
      // 8 Mentor
      "Sua resposta está incompleta. Tente novamente.",
      // 9 Jogador op 3
      "HAHAHA eu não gosto muito, comi uma vez e meu estômago não se acostumou. A comida é ruim," +
      " mas vou dar um voto de confiança e tentar jantar. Quem sabe dessa vez melhore?" +
      " Agora preciso de seu nome completo e data de nascimento, por favor.",
      // 10 Mentor
      "Não é ético dizer ao paciente sua percepção sobre o hospital.",
      // 11 Paciente
      "Carlos Esme Gouvêa, nasci em 01/12/1945.",
      // 12 Jogador
      "Vou verificar sua pulseira e depois examiná-lo, Sr. Carlos. Com licença."
    ]
  },

  fase3: {
    recepcao: [
      // 0 Recepcionista
      "Bom dia! Hoje o mentor não poderá te apresentar seu novo paciente, mas estará aqui no hospital" +
      " caso precise. Ele também pediu para que você comece pela enfermaria masculina. Boa Sorte!"
    ],
    alaMasculina: [
      // 0 Jogador
      "Bom dia!",
      // 1 Paciente
      "Bom dia.",
      // Ação - pegar o prontuário
      // 2 Jogador
      "Parece que temos um procedimento para ser realizado, vou até o posto de enfermagem e já volto.",
      // 3 Lixo Errado Alerta
      "Tem certeza que está realizando o descarte no lixo correto?",
      // 4 Alerta Checar Prontuario
      "Você deve checar o prontuário."
    ],
    leitoPaciente: [
      // 0 Jogador
      "Olá. Sou profissional de enfermagem e preciso fazer alguns testes." +
      " Deixe-me conferir sua pulseira de identificação, por favor?",
      // 1 Paciente
      "Pero de nuevo?",
      // 2 Jogador
      "É um procedimento padrão. Raul Gonzales, 78 anos, certo?" +
      " Pelo sotaque dá para perceber que o Sr. não é daqui. Espanha?",
      // 3 Paciente
      "No no no, soy de mi amada Argentina.",
      // 4 Jogador
      "Justo a Argentina, Sr. Raul? Hahaha. Vou verificar sua glicemia para que possamos acompanhar" +
      " a diabetes. Quando precisar se levantar, aperte a campainha e terá auxílio imediato.",
      // 5 Paciente
      "Gracias! Soy velho e últimamente já no consigo estar en pie.",
      // Ação - medir a glicemia
      // 6 Paciente
      "Cuál foi el resultado?",
      // 7 Jogador op 1
      "Não me lembro do valor",
      // 8 Mentor
      "Memorize o valor e tente novamente.",
      // 9 Jogador op 2
      "Sua glicemia está 180 mg/dl. Não se preocupe, está estabilizando.",
      // 10 Jogador op 3
      "240 mg/dl.",
      // 11 Mentor
      " Seu resultado está incorreto. Tente novamente."
    ],
    corredor: [
      // 0 Jogador
      "Olá, Alberto. A taxa de glicemia  do paciente estava alterada, tornando-o propenso a" +
      " quedas. Ergui a grade do leito e cumpri os procedimentos prescritos.",
      // 1 Mentor
      "O  Núcleo de Segurança do Paciente do nosso hospital orienta a avaliação diária do" +
      " paciente para a diminuição das incidências de quedas. Parabéns pela avaliação."
    ]
  },

  fase4: {
    recepcao: [
      // 0 Recepcionista
      "Bom dia! O mentor lhe espera no corredor."
    ],
    corredor: {
      fala1: [
        // 0 Mentor
        "Olá! Estamos prestes a entrar no centro cirúrgico. Você será responsável pela aplicação" +
        " da primeira fase da lista de verificação de segurança cirúrgica. Porém, antes de começarmos," +
        " você sabe qual a importância da aplicação desta lista?",
        // 1 Jogador op 1
        "Claro! Ela é utilizada para reduzir os riscos de incidentes cirúrgicos.",
        // 2 Jogador op 2
        "Desculpe, não sei o porquê devo utilizá-la.",
        // 3 Jogador op 3
        "É  apenas um papel a ser preenchido, sem muita importância.",
        // 4 Mentor
        "Muito bem! Antes de levar a paciente para a cirurgia, você deve ir ao centro cirúrgico " +
        "e verificar com a circulante de sala se todos os equipamentos estão em ordem.",

        // mensagem do mentor em caso de resposta incorreta

        // 5 - resposta a OP2
        "Imagine  todos  os  riscos  existentes  nos " +
        "procedimentos  cirúrgicos!  A  lista  é  um  das " +
        "estratégias para tentar amenizá-los.",

        // 6 - resposta a OP3
        "A lista  é  uma  estratégia muito  importante  para " +
        "evitar  erros  durante  todo  o  procedimento " +
        "cirúrgico.  É  um  documento  de  extrema importância!",

        // 7
        "A paciente o espera na enfermaria feminina."
      ],
      fala2: [
        // 0 Jogador
        "Tudo pronto, Alberto, a paciente já está no centro cirúrgico.",
        // 1 Mentor
        "Utilizar o protocolo de cirurgia segura é um ganho enorme para nosso hospital e todos os  pacientes." +
        " Parabéns!"
      ]
    },
    centroCirurgico: {
      fala1: [
        // 0 Aline
        "Bom dia! Você  encaminhará a paciente ao centro cirúrgico?",
        // 1 Jogador op 1
        "Sim! Mas antes, o mentor Alberto me pediu para verificar os equipamentos da sala com você.",
        // 2 Jogador op 2
        "Não, ainda não a conheci!",
        // 3 Jogador op 3
        "Sim, já vou buscá-la.",
        // 4 Jogador
        "Terminamos, Aline. Vou buscar a paciente.",
        // 5 op errada1
        "Você  ainda  irá  conhecer  a  paciente  e  é  o" +
        " responsável por trazê-la ao centro cirúrgico!",
        // 6 op errada2
        "Nunca  se  esqueça  de  verificar  todos  os" +
        " equipamento, pois  assim  evitamos  a ocorrência" +
        " de imprevistos na cirurgia!",

        // 7 ALERTA LAVAR MAOS CIRURGICA
        "Higienize suas mãos utilizando as técnicas" +
        " cirúrgicas.",

        // 8 ALERTA LAVAR MAOS
        "Não se esqueça do procedimento mais frequente" +
        " e vital de um hospital. Você já o realizou várias" +
        " vezes até aqui. Consegue lembrar qual é ele?",

        // 9 ALERTA TESTAR EQUIPAMENTOS
        "Você está se esquecendo de algo importante!"
      ],
      fala2: [
        // 0 Aline
        "Você sabe em qual momento precisará realizar a primeira" +
        " fase da lista de verificação de segurança cirúrgica?",
        // 1 Jogador op 1
        "Claro! A primeira fase é antes da indução anestésica.",
        // 2 Jogador op 2
        "Claro! A primeira fase é antes da incisão cirúrgica.",
        // 3 Jogador op 3
        "Claro! A primeira fase é antes do paciente sair da sala de operação.",
        // 4 Jogador
        "Sra. Regina, preciso fazer algumas perguntas antes da indução anestésica, tudo bem?" +
        " Apenas para verificar se está tudo em ordem.",
        // 5 Paciente
        "Magina! Pode fazer quantas perguntas quiser.",
        // 6 Jogador
        "Seu nome?",
        // 7 Paciente
        "Regina Oliveira.",
        // 8 Jogador
        "Parte do corpo em que será feita a cirurgia?",
        // 9 Paciente
        "Pé esquerdo.",
        // 10 Jogador
        "Qual procedimento será realizado?",
        // 11 Paciente
        "Num sei o nome direito, acho que é amputação transtártica ou coisa parecida." +
        " Ah, vão colocar enxerto também.",
        // 12 Jogador
        "Certo! O nome do procedimento é Amputação transmetatársica à esquerda e Enxerto Poplíteo." +
        " A Sra. assinou o termo de consentimento?",
        // 13 Paciente
        "Sim.",
        // 14 Jogador
        "A Sra. possui algum tipo de alergia?",
        // 15 Paciente
        "Que eu saiba, não.",
        // 16 Jogador op 1
        "Tudo certo até agora, Sra. Regina. Agora preciso verificar o oxímetro de pulso e o local da cirurgia.",
        // 17 Jogador op 2
        "Tudo certo até agora, Sra. Regina.",
        // 18 Jogador op 3
        "Desculpe, Sra. Regina, preciso fazer mais algumas perguntas.",

        // 19 op2 - primeira parte
        "Tem certeza? Talvez a primeira fase deva ser" +
        " aplicada em um procedimento anterior.",

        // 20 op3 - primeira parte
        "Você tem certeza de que irá verificar o paciente" +
        " apenas no fim do procedimento?",

        // 21 op2 - segunda parte
        "O oxímetro de pulso do paciente e a indicação " +
        "do local cirúrgico devem ser verificados!",

        // 22 op3 - segunda parte
        "Você já possui todas as informações necessárias!"
      ]
    },
    alaFeminina: [
      // tabela
    ],
    leitoPaciente: [
      // 0 Jogador
      "Bom dia! Sou profissional de enfermagem e levarei a Sra. para a sala de cirurgia." +
      " Qual é o seu nome?",
      // 1 Paciente
      "Bom dia! Regina Oliveira, muito prazer.",
      // 2 Jogador
      "O prazer é meu. A Sra. está agendada para uma cirurgia hoje, certo?!" +
      " Como está se sentindo?",
      // 3 Paciente
      "Certo. Tô um tiquinho nervosa, pra mim agulha só é boa com linha.",
      // 4 Jogador
      "A Sra. costura? Que legal! Fique tranquila, Sra. Regina, estamos cuidando de todos os detalhes de sua cirurgia." +
      " A Sra. não pode entrar no centro cirúrgico com adornos ou próteses. Está ou tem algo do gênero?",
      // 5 Paciente
      "Num tô não! Minha filha já tá com tudinho lá fora."
    ]
  },

  fase5: {

    recepcao: [
      // 0 Jogador
      "Bom dia, Clarice.",
      // 1 Recepcionista Clarice
      "Bom dia! Um paciente o aguarda na enfermaria masculina. Mas antes quero lhe entregar o folheto dos 'Nove Certos' da administração de medicação."
    ],
    alaMasculina: [
      // 0 Jogador
      "Bom dia! Sou profissional de enfermagem e atenderei o Sr. hoje. Deixe-me ver seu prontuário...",
      // 1 Paciente Pedro
      "Bom dia. Hora da medicação? Qual é a de hoje?",
      // 2 Jogador op 1
      "Sim Sr.! Ainda é o segundo dia de uso do Keflin. Vou preparar sua medicação e já volto.",
      // 3 Jogador op 2
      "Sim, mas o nome da medicação não é uma informação importante, não se preocupe.",
      // 4 Jogador op 3
      "Não sei dizer, não há nada anotado no prontuário.",
      // 5 Correção op 2
      "Forneça ao paciente as informações sobre a medicação.",
      // 6 Correção op 3
      "Tem certeza? Olhe atentamente o prontuário do paciente."
    ],
    farmacia: [
      // 0 Paulo
      "Bom dia! Do que precisa?",
      // 1 Jogador
      "Bom dia, Paulo! Vim buscar o medicamento prescrito para um paciente da enfermaria masculina." +
      " Aqui está o prontuário.",
      // 2 Paulo
      "Pronto. Este é o frasco de Keflin, sua apresentação é de 1g.",
      // 3 Jogador
      "Agradeço, Paulo! Preciso voltar ao paciente."
    ],
    postoDeEnfermagem: [
      // 0 Jogador
      "No prontuário estava prescrita uma dose de 800 mg," +
      " portanto o valor a ser aspirado é de 4 ml do frasco de 1g.",
      // 1 Jogador
      "Deverão ser aspirados apenas 2 ml.",
      // 2 Jogador
      "No prontuário estava prescrita uma dose de 800 mg," +
      " portanto o valor a ser aspirado é de 8 ml do frasco de 1 g.",
      // 3 Jogador
      "Você tem certeza desse resultado?",
      // 4 Jogador
      "Acredito que peguei tudo o que precisava.",
      // 5 Mentor
      "Muito bem! Vamos conferir se a medicação dispensada é a mesma prescrita.",
      // 6 Mentor (se o jogador esquece de algum item)
      "Você está se esquecendo de algo. Volte e tente se lembrar."
    ],
    leitoPaciente: [
      // 0 Jogador
      "Voltei. Antes da administração do medicamento, o Sr. poderia me dizer" +
      " seu nome e data de nascimento, por favor?",
      // 1 Paciente Pedro
      "Claro. Pedro Alcídes Mendonça, nasci em 03 de junho de 1962.",
      // 2 Jogador op 1
      "Sr. Pedro, este medicamento é o Keflin; sua ação é antimicrobiana" +
      " e ele vai correr no período de uma hora, tudo bem?",
      // 3 Jogador op 2
      "Sr. Pedro, vou administrar o medicamento. Tudo bem?",
      // 4 Jogador op 3
      "Sr. Pedro, vou administrar o medicamento. Caso queira saber sua função," +
      " pergunte ao médico responsável e ele saberá te informar.",
      // 5 Paciente Pedro
      "Muito obrigado. E me desculpe pelas perguntas, é mania de professor.",
      // 6 Jogador
      "Hahaha. Sem problemas. Se sentir qualquer sensação estranha é só me comunicar." +
      " Por favor, não abra a pinça do equipo e em breve poderá voltar para seus alunos.",
      // 7 Mentor
      "Lembre-se sempre de utilizar os nove certos na administração de medicamentos!" +
      " Deste modo reduzimos a possibilidades de erros.",
      // 8 Mentor - Correção op 2
      "Você precisa explicar a finalidade do uso desta medicação.",
      // 9 Mentor - Correção op 3
      "É um erro gravíssimo administrar um medicamento sem saber sua função!"
    ],
    lugarIncorreto: [
      // 0 Mentor
      "Está perdido? O lugar certo é a enfermaria masculina.",
      // 1 Mentor
      "Está perdido? O lugar certo é a Farmácia.",
      // 2 Mentor
      "Está perdido? O lugar certo é o Posto de Enfermagem."
    ]
  },

  fase6: {
    recepcao: [
      // 0 Recepcionista
      "Boa tarde! Temos uma paciente à sua espera."
    ],
    corredor: [
      // 0 Jogador
      "Boa tarde, Alberto!",
      // 1 Mentor
      "Boa tarde! A paciente de hoje teve um Acidente Vascular Encefálico Isquêmico (AVCI)." +
      " Ela também sofreu uma queda, resultando em uma lesão. Vá até a enfermaria" +
      " feminina para realizar os procedimentos necessários."
    ],
    alaFeminina: [
      // 0 Jogador
      "Boa tarde!",
      // 1 Paciente
      "Boa tarde!",
      // 2 Jogador
      "Sou da equipe de enfermagem do hospital e realizarei os cuidados esta tarde."
    ],
    leitoPaciente: [
      // 0 Jogador
      "Antes de começarmos, a Sra. poderia me dizer seu nome completo, por favor?",
      // 1 Paciente
      "Esther Fidelis.",
      // 2 Jogador
      "Sra. Esther, temos dois procedimentos a serem realizados: o primeiro será" +
      " um teste de glicemia capilar. O segundo será um curativo no local machucado pela queda." +
      " A Sra. sofreu um acidente vascular, não é mesmo?",
      // 3 Paciente
      "Sim. O estress e a correria no Consulado são diárias, eu já esperava que isso talvez" +
      " pudesse acabar acontecendo. Ao menos os movimentos do meu lado direito estão voltando," +
      " tudo estava paralisado. E caso ajude, sou diabética e hipertensa.",
      // 4 Jogador op 1 - Certa
      "Realizarei alguns procedimentos, qualquer dúvida basta perguntar." +
      " Além disso, deixarei sua grade sempre erguida; a Sra. pode ter" +
      " sensação de desequilíbrio devido à queda e a medicação.",
      // 5 Jogador op 2
      "Vou começar a realizar os procedimentos!",
      // 6 Mentor - Resposta op 2
      "Você pode fornecer mais informações à paciente."
    ]
  },

  fase7: {
    recepcao: [
      // 0 Recepcionista
      "Bom dia! O mentor te espera no corredor para a apresentação do seu próximo caso.",
      // 1 Jogador
      "Estou indo encontrá-lo, Clarice."
    ],
    corredor: [
      // 0 Mentor
      "Bom dia! Hoje seu paciente será o Sr. Josivaldo Silva. A alimentação dele" +
      " está sendo realizada através de uma sonda nasogástrica. Lembre-se de que os" +
      " cuidados na administração de dietas são iguais aos da administração de medicamentos.",
      // 1 Jogador op 1
      "Sim, Alberto! Antes de administrar qualquer substância, sei que devo" +
      " prestar atenção na conexão correta da sonda.",
      // 2 Jogador op 2
      "Sim, Alberto! Não se preocupe, passar uma dieta é simples.",
      // 3 Mentor
      "Boa sorte com seu novo paciente!",
      // 4 Mentor Corrige
      "A administração de dieta é um procedimento que requer muita atenção para um tratamento efetivo!"
    ],
    alaMasculina: [
      // 0 Jogador
      "Bom dia! Sou profissional de enfermagem e acompanharei o Sr. esta manhã." +
      " Como está se sentindo?",
      // 1 Paciente
      "Bom dia! Tô marromeno, mas nada que me aperreie.",
      // 2 Jogador op 1
      "Sr. Josivaldo... Seu prontuário tem uma prescrição de dieta," +
      " vou até a farmácia buscar os equipamentos necessários e já volto.",
      // 3 Jogador op 2
      "Sr. Josivaldo... Além de sua sonda nasogástrica, por hora não há nada prescrito.",
      // 4 Mentor Corrige
      "O prontuário do paciente precisa ser consultado!"
    ],
    farmacia: [
      // 0 Jogador op 1
      "Oi, Paulo! Preciso de uma dieta para um paciente que está com sonda nasogástrica.",
      // 1 Jogador op 2
      "Oi, Paulo! Me esqueci do que estava anotado na prescrição, aguarde um momento.",
      // 2 Farmaceutico
      "A dieta dele foi solicitada ontem e já está preparada. Aqui está.",
      // 3 Mentor
      "Você conferiu a dieta corretamente. Parabéns! A partir deste momento, tenha em mente que" +
      " neste hospital usamos equipos de cores específicas para evitar possíveis erros de conexão.",
      // 4 Mentor Corrige
      "A administração de dieta é um procedimento que requer muita atenção e seus cuidados são essenciais para um tratamento efetivo!",
      // 5 Pegar MEdicamento
      "Pegue a dieta para depois conferi-la."
    ],
    postoEnfermagem: [
      // 0 Jogador op 1
      "A infusão da dieta ocorrerá em 67 gotas por minuto no período de uma hora.",
      // 1 Jogador op 2
      "A infusão da dieta ocorrerá em 33 gotas por minuto no período de uma hora.",
      // 2 Jogador op 3
      "A infusão da dieta ocorrerá em 67 gotas no período de uma hora.",
      // 3 Mentor Corrige
      "Parece que você se enganou. Tente novamente.",
      // 4
      "O equipamento necessário possui cor específica."
    ],
    leitoPaciente: [
      // 0 Jogador
      "Vou começar a administrar sua dieta, mas antes, por favor, me diga seu nome completo e data de nascimento.",
      // 1 Paciente
      "Ôxi! Craro! Mi chamo Josivaldo da Silva, mas não se avexe não, pódi chamá de Valdin." +
      " Nasci no sértão da Paraíba dia 02 de féverero de 1961.",
      // 2 Jogador
      "Nordestino, Josivaldo?",
      // 3 Paciente
      "Nordéstino, da péxera e carni di sol paraibana, com muito órgulho!",
      // 4 Jogador
      "Que legal! Sempre quis conhecer o nordeste brasileiro. Qualquer dúvida ou anormalidade na sonda" +
      " durante a passagem da dieta, basta me avisar e resolverei o problema.",
      // 5 Paciente
      "Sim sinhô! Brigado."
    ]
  },

  fase8: {
    recepcao: [
      // 0 Jogador
      "Bom dia, Clarice.",
      // 1 Recepcionista
      "Bom dia. Uma paciente te espera na enfermaria feminina."
    ],
    enfermariaFeminina: [
      // 0 Jogador op 1
      "Bom dia! Faço parte da equipe de enfermagem do hospital e cuidarei de você hoje. Como se chama?",
      // 1 Jogador op 2
      "Bom dia! Como se chama?",
      // 2 Paciente
      "Ana Beatriz Galvão.",
      // 3 Jogador
      "Muito prazer, Ana Beatriz. Você está recebendo medicação antes do café da manhã, certo?",
      // 4 Paciente
      "Certo! São para controlar o diabetes.",
      // 5 Jogador
      "Vou até a farmácia buscar sua dose de hoje e volto em breve.",
      // 6 MENTOR
      "Sua apresentação profissional é a parte mais importante do diálogo com" +
      " o paciente. Tente novamente."
    ],
    farmacia: [
      // 0 Jogador
      "Bom dia, Paulo! Desta vez preciso de Clorpropamida 250mg para uma paciente diabética.",
      // 1 Farmacêutico
      "Aqui está. Venha sempre que precisar.",
      // 2 Jogador op 1
      "Desculpe, Paulo,  mas você me entregou Clorpromazina. Eu preciso da Clorpropamida de 250 mg.",
      // 3 Jogador op 2
      "Voltarei sim! Até a próxima prescrição.",
      // 4 Farmacêutico
      "Me desculpe! Verificarei com mais atenção a dispensação dos medicamentos realizados" +
      " pela equipe aqui da farmácia e afirmo que isto não voltará a se repetir." +
      " Esta é a medicação correta. Você se lembra  da diferença entre elas?",
      // 5 Jogador op 1
      "Está tudo bem, sempre verifico a medicação antes de usá-la no paciente." +
      " Não me lembro muito bem das funções, mas está na prescrição e preciso apenas aplicar.",
      // 6 Jogador op 2
      "Está tudo bem, sempre verifico a medicação antes de usá-la no paciente." +
      " A Clorpromazina é um antipsicótico que necessita de receituário de controle especial." +
      " Já a clorpropamida é um hipoglicemiante oral.",
      // 7 - mentor
      "Parece que há algo errado com sua medicação. Verifique para ter certeza.",
      // 8 - mentor
      "Atenção! É muito importante saber a finalidade e indicação de uso de cada medicação. Além disso, cuidado com medicações de nomes semelhantes."

    ],
    postoEnfermagem: [],
    leitoPaciente: [
      // 0 Paciente
      "Que bom que voltou, já estou ficando com fome.",
      // 1 Jogador
      "Então pode ficar animada, Ana Beatriz. Eu trouxe sua medicação.",
      // 2 Paciente
      "Animada vou ficar quando puder voltar para meu computador trabalhar." +
      " Não terminei a edição de um comercial, meu chefe deve estar furioso!",
      // 3 Jogador op 1
      "Você trabalha com publicidade? Muito legal! Agora lembre-se: A clorpropamida reduz" +
      " o índice de glicose no seu organismo, caso sinta algo fora do comum me avise.",
      // 4 Jogador op 2
      "Você trabalha com publicidade? Muito legal! Me chame se precisar de algo.",
      // 5 Paciente
      "Ok! Te chamarei caso eu precise.",
      // 6 Jogador
      "Em breve será liberada e poderá voltar para seu trabalho. Aproveite o café da manhã.",
      // 7 Paciente
      "Obrigada.",
      // 8 MENTOR CORRIGE
      "Forneça ao paciente toda informação possível sobre o medicamento que será admnistrado."
    ],
    alaFeminina: [
      // tabela
    ]
  },

  fase9: {

    recepcao: [

      // 0
      "Bom dia. Um novo paciente o aguarda na enfermaria masculina."

    ],


    alaMasculina: [
      // 0 Jogador
      "Boa noite! Sou responsável por levá-lo até o centro cirúrgico. Como é o seu nome?",
      // 1 Paciente
      "Boa noite! Sou Yuri.",
      // 2 Jogador
      "O que aconteceu com você?",
      // 3 Paciente
      "Bom... Parece que rompi o ligamento do joelho, mas foi mancada minha." +
      " Cruzei o sinal no amarelo, uma van me fechou e caí da moto.",
      // 4 Jogador
      "Por sorte foi apenas o joelho. Antes de irmos ao centro cirúrgico," +
      " vou até a farmácia buscar o medicamento que você precisará tomar. Está nervoso?",
      // 5 Paciente
      "Nervoso não, um pouco ansioso, eu diria. E talvez com um pouco de medo, nunca fiz uma cirurgia.",
      // 6 Jogador
      "Fique calmo, Yuri, vai dar tudo certo!"

    ],
    farmacia: [
      // 0 Farmaceutico
      "Olá! Do que precisa hoje?",
      // 1 Jogador
      "Oi, Paulo! Preciso de Midazolam de 15 mg.",
      // 2 Farmaceutico
      "Aqui está!"
    ],
    leitoPaciente: [
      // 0 Jogador
      "Yuri, esta medicação se chama Midazolan. Ela serve para sedar o paciente" +
      " antes de darmos início aos procedimentos cirúrgicos. Você poderia me falar" +
      " seu nome completo e mostrar a pulseira de identificação, por favor?",
      // 1 Paciente
      "Ok. Yuri de Souza Almeida.",
      // 2 Jogador
      "Certo, Yuri. Por favor tome a medicação e iremos para o centro cirúrgico em seguida.",
      // 3 Jogador
      "Pronto Yuri! Agora por favor me acompanhe até o centro cirúrgico."
    ],
    centroCirurgico: [
      // 0 Jogador op 1
      "Boa noite, Aline! Trouxe o paciente da próxima cirurgia. Você precisa de ajuda?",
      // 1 Jogador op 2
      "Boa noite, Aline! Trouxe um paciente para cirurgia. Antes de começarmos os procedimentos" +
      " cirúrgicos, posso checar os equipamentos e fazer a lista de verificação?",
      // 2 Mentor resposta op 1
      "Atenha-se à sua função! Seu trabalho ainda não está terminado.",
      // 3 Circulante da sala
      "Boa noite. Claro! Fique à vontade.",
      // 4 Jogador
      "Yuri, vou te fazer algumas perguntas para verificar se está tudo em ordem" +
      " antes da indução anestésica. Tudo bem?",
      // 5 Paciente
      "Sem problemas. Pode mandar.",
      // 6 Jogador
      "Nome completo?",
      // 7 Paciente
      "Yuri de Souza Almeida.",
      // 8 Jogador
      "Idade e profissão?",
      // 9 Paciente
      "22, futuro engenheiro civil, se Deus quiser e o trânsito deixar.",
      // 10 Jogador
      "Hahaha. Em qual parte do corpo será feita a cirurgia?",
      // 11 Paciente
      "Na perna direita.",
      // 12 Jogador
      "Qual procedimento?",
      // 13 Paciente
      "Não tenho muita certeza... Acho que é uma cirurgia do ligamento ...cruzado anterior.",
      // 14 Jogador
      "Você assinou o termo de consentimento?",
      // 15 Paciente
      "Sim.",
      // 16 Jogador
      "Você tem alguma alergia conhecida?",
      // 17 Paciente
      "Sou... alér...gico a dipiro...na e... sulfa.",
      // 18 Jogador
      "A anestesia já começou a fazer efeito. Esta é a circulante de sala Aline," +
      " ela cuidará de você a partir de agora. Boa cirurgia, Yuri!"
    ]
  },

  fase10: {

    recepcao: [

      // 0
      "Bom dia. Um paciente te espera na enfermaria masculina."

    ],

    alaMasculina: [
      // 0 Jogador op 1
      "Bom dia! Sou profissional de enfermagem deste hospital e cuidarei do Sr. hoje." +
      " Qual seu nome e como se sente esta manhã?",
      // 1 Jogador op 2
      "Bom dia! Vim para cuidar do Sr. esta manhã.",
      // 2 Paciente
      "Pedro Alcides Mendonça, ao seu dispor. Tô bem não, tô meio mole.",
      // 3 Jogador
      "O Sr. parece muito desidratado. Vou até a farmácia buscar o soro prescrito" +
      " pelo médico e, assim que eu voltar, verificaremos seus sinais vitais.",
      // 4 Paciente
      "Tá certo! Brigado.",
      // 5 Mentor Alerta
      "Esqueceu de se apresentar? E como está o paciente?",
      // 6 Esqueceu prescricao ou prontuario
      "Você está se esquecendo de algo importante."
    ],
    farmacia: [
      // 0 Farmaceutico
      "Mais um paciente?",
      // 1 Jogador
      "Sim, Paulo. E desta vez preciso de Soro glicosado  5% - 1000ml e NaCl 20 %- 20 ml.",
      // 2 Farmaceutico
      "Aqui está. Boa sorte!",
      // 3 MENTOR ALERTA
      "Você está se esquecendo de uma etapa muito importante!",
      // 4
      "Você deve pegar os medicamentos para auxiliar o paciente."

    ],
    leitoPaciente: [
      // 0 Jogador
      "Sr. Pedro, antes de começarmos, o Sr. poderia me dizer sua" +
      " data de nascimento e me deixar verificar sua pulseira de identificação?",
      // 1 Paciente
      "Sí. 02 de deciembro de 1937.",
      // 2 Jogador
      "Opa! Sr. Raul? Porque está no leito do Sr. Francisco?",
      // 3 Paciente
      "Trocámos de cama, no és possible assistir a la pelicula daquele lado!",
      // 4 Jogador op 1
      "Desculpe Sr. Raul, mas por medidas de segurança os pacientes não podem trocar de leito." +
      " Conseguiremos encontrar uma maneira em que o Sr. consiga assistir" +
      " à televisão daquela cama.Vamos destrocar?",
      // 5 Jogador op 2
      "Tudo bem, Sr. Raul, porém deixarei apenas desta vez, ok?!",
      // 6
      "Esta não foi a melhor decisão. A permanência do paciente em seu próprio leito evita possíveis erros e confusões. Tente novamente.",
      // 7
      "Tente conversar com o paciente primeiro."
    ],

    postoDeEnfermagem: [
      // 0
      "Lembre-se de pegar todos os equipamentos antes de sair!"
    ],

    leitoPaciente1: [
      // 0 Jogador
      "Agora estamos no leito correto, Sr. Pedro.",
      // 1 Paciente
      "Desculpa aí pela confusão, pensei que pudia mudar de cama." +
      " O argentino queria ver a novela e essa aqui tá me dando dor nas costas…" +
      " ou pode ser por causa do caminhão. Achei melhor trocar pra ter certeza.",
      // 2 Jogador
      "O Sr. é caminhoneiro? Suas dores nas costas realmente podem ser consequência" +
      " de sua posição lombar ao dirigir. Vou pedir para a manutenção verificar sua cama e," +
      " caso seja necessário, ela será substituída. Vamos checar seus sinais vitais?",
      // 3 Paciente
      "Sou sim. Brigada pela ajuda e pode medir o que precisar aí, tenho que ficar bom rápido.",
      // 4 Jogador
      "Falta apenas a infusão do soro. Qualquer desconforto basta me avisar, ok?!"
    ]
  },

  alertas: {
    generico: "Alerta do mentor",
    lavarMaos: {
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
    enfermariaMasculina: [
      "Volte à enfermaria masculina."
    ],
    perdido: {
      enfermagem: [
        // 0 op 1
        "Está perdido? O lugar correto é o posto de enfermagem.",
        // 1 op 2
        "Você tem certeza de que este é o lugar certo?"
      ],
      alaFeminina: [
        "Esta é a enfermaria correta?"
      ],
      farmacia: [
        "Você precisa encontrar seu paciente primeiro!"
      ],
      irParaFarmacia: [
        "Você precisa ir até a farmácia primeiro!"
      ],
      centroCirurgico: [
        "Primeiro teste os equipamentos que serão utilizados na cirurgia."
      ],
      corredor: [
        "Converse comigo para saber qual é a enfermaria correta."
      ]
    },
    esqueceu: {
      coxim: [
        "Você está se esquecendo de algo!"
      ],
      luvas: [
        "Você precisa de proteção para as mãos!"
      ],
      algodão: [
        "O algodão seco precisa ser utilizado."
      ],
      conversarPaciente: [
        "A comunicação com o paciente é essencial na assistência de enfermagem!"
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
      objetoQualquer: [
        "Volte ao posto de enfermagem, você se esqueceu de alguns instrumentos."
      ],
      elevarGrade: [
        // 0 - Paciente homem
        "Previna o paciente de futuras quedas! Pense e encontre a solução.",
        // 1 - Paciente mulher
        "Previna a paciente de futuras quedas! Pense e encontre a solução."
      ],
      falarPaciente: [
        "Tente conversar com o paciente."
      ],
      verPulseira: [
        "Nunca se esqueça de verificar a identificação da paciente!"
      ],
      materiaisCurativo: [
        "Onde estão os materiais do curativo?"
      ],
      luvasEstereis: [
        "Luvas estéreis são essenciais!"
      ],
      identificarCurativo: [
        "Todo curativo precisa ser identificado!"
      ],
      anotarProntuario: [
        "O prontuário está vazio. Que tal fazer algumas anotações?"
      ],
      verProntuario: [
        // 0 - Paciente homem
        "Você precisa verificar o prontuário do paciente.",
        // 1 - Paciente mulher
        "Você precisa verificar o prontuário da paciente."
      ],
      informarPaciente: [
        "Você precisa explicar todo procedimento realizado à paciente, é direito dela!"
      ],
      verificarMedicamento: [
        "Toda medicação precisa ser conferida!"
      ],
      verificarMedicamento2: [
        "Você tem certeza que esta é a medicação correta?"
      ],
      verificarMedicamento3: [
        "Sempre confirme se o medicamento fornecido é o mesmo prescrito."
      ],
      pegarMedicamento: [
        "Você já pegou a medicação solicitada para a paciente?"
      ],
      pegarBandeja: [
        "Primeiro pegue a bandeja para colocar os equipamentos."
      ],
      pegarObjetosGaveta: [
        "Caso o paciente não possua restrição hídrica, medicações de via oral devem ser acompanhadas de líquido para facilitar na deglutição."
      ],
      verificarOximetro: [
        "Lembre-se de verificar o oxímetro e o local da cirurgia antes de colocar a placa neutra."
      ],
      conferirDieta: [
        "Nunca se esqueça de conferir a dieta fornecida pelo farmacêutico."
      ],
      pegarDieta: [
        "O paciente necessita da dieta!"
      ],
      folheto9certos: [
        "Pegue o folheto dos 9 certos!"
      ],
      objetosGaveta: [
        "Você já pegou todos os equipamentos necessários?"
      ],
      verificarTudoPostoEnfermagem: [
        "Certifique-se de realizar todos os procedimentos antes de sair!"
      ],
      erroGotejamento: [
        "O cálculo incorreto do gojetamento pode ter sérias consequências! Tente novamente."
      ],
      erroFichaMedicacao: [
        "Parece que há algum equívoco na preenchimento da ficha de medicação. Verifique-a novamente antes de sair."
      ]
    },
    descarte: {
      algodão: [
        // 0 Descarte na bandeja
        "O algodão deve ser descartado na bandeja antes de ir para um depósito mais adequado."
        // 1 Descarte no lixo branco
      ],
      agulha: [
        "Faça o descarte da agulha em local adequado para evitar acidentes de trabalho."
      ],
      objetos: [
        "Primeiro realize o descarte dos materiais nos lixos adequados."
      ]
    },
    luvasErradas: [
      "Esta realmente é a luva utilizada para curativos?"
    ]
  }
});
