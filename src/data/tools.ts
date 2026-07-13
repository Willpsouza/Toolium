import type { CategorySlug } from "./categories"

export interface ToolFaq {
  q: string
  a: string
}

export interface ToolContentBlock {
  heading?: string
  paragraphs: string[]
}

export interface Tool {
  slug: string
  title: string
  name: string
  category: CategorySlug
  icon: string
  tagline: string
  description: string
  keywords: string[]
  intro: string
  content: ToolContentBlock[]
  howTo: string[]
  example: string
  benefits: string[]
  faq: ToolFaq[]
  popular?: boolean
  /** optional How-To structured steps for HowTo schema */
  howToSteps?: string[]
}

export const tools: Tool[] = [
  // ===================== CALCULADORAS =====================
  {
    slug: "calculadora-porcentagem",
    title: "Calculadora de Porcentagem",
    name: "Porcentagem",
    category: "calculadoras",
    icon: "Percent",
    tagline: "Calcule porcentagem, aumento e desconto em segundos.",
    description:
      "Calculadora de porcentagem online grátis. Descubra quanto é X% de um valor, aumento e desconto percentual de forma rápida e precisa.",
    keywords: [
      "calculadora de porcentagem",
      "calcular porcentagem",
      "porcentagem online",
      "aumento percentual",
      "desconto percentual",
    ],
    intro:
      "Calcule qualquer porcentagem em segundos: quanto é X% de um valor, aumento percentual e desconto. Simples, preciso e 100% gratuito.",
    content: [
      {
        heading: "O que é porcentagem e como funciona",
        paragraphs: [
          "Porcentagem é uma forma de expressar uma proporção em relação a 100. O símbolo % significa \"por cento\", ou seja, dividir por 100. Quando dizemos 20%, estamos falando de 20 partes em cada 100.",
          "A calculadora de porcentagem do Toolium resolve os três cálculos mais comuns do dia a dia: descobrir quanto um percentual representa de um valor, calcular um aumento e calcular um desconto — sem precisar lembrar de fórmulas.",
        ],
      },
      {
        heading: "Fórmulas utilizadas",
        paragraphs: [
          "Para calcular X% de um valor: (porcentagem ÷ 100) × valor.",
          "Para calcular aumento: valor + (porcentagem ÷ 100) × valor.",
          "Para calcular desconto: valor − (porcentagem ÷ 100) × valor.",
          "Essas três operações cobrem a maioria das situações práticas, de promoções de loja a reajustes de salário.",
        ],
      },
    ],
    howTo: [
      "Escolha o tipo de cálculo: porcentagem de um valor, aumento ou desconto.",
      "Digite o valor base e o percentual desejado.",
      "O resultado aparece automaticamente, sem precisar clicar em calcular.",
    ],
    example:
      "Exemplo: 15% de 200 é igual a 30. Um desconto de 15% sobre um produto de R$ 200 resulta em R$ 170.",
    benefits: [
      "Resultados instantâneos enquanto você digita",
      "Três modos de cálculo na mesma tela",
      "Útil para compras, salários, impostos e estudos",
    ],
    faq: [
      {
        q: "Como calcular porcentagem sem calculadora?",
        a: "Divida o percentual por 100 e multiplique pelo valor. Por exemplo, 20% de 50: 20 ÷ 100 = 0,2, depois 0,2 × 50 = 10.",
      },
      {
        q: "A calculadora de porcentagem é gratuita?",
        a: "Sim, é 100% gratuita e não exige cadastro. Use quantas vezes quiser.",
      },
      {
        q: "Como calcular desconto de uma promoção?",
        a: "Use o modo \"desconto\", informe o preço original e o percentual de desconto. O resultado mostra o valor do abatimento e o preço final.",
      },
    ],
    popular: true,
    howToSteps: [
      "Selecione o tipo de cálculo de porcentagem desejado.",
      "Informe o valor base e a porcentagem.",
      "Leia o resultado exibido automaticamente.",
    ],
  },
  {
    slug: "calculadora-juros-compostos",
    title: "Calculadora de Juros Compostos",
    name: "Juros Compostos",
    category: "calculadoras",
    icon: "TrendingUp",
    tagline: "Veja quanto seu dinheiro renderá com juros compostos.",
    description:
      "Calculadora de juros compostos online grátis. Simule investimentos com aportes mensais e veja o montante final, juros totais e gráfico de evolução.",
    keywords: [
      "calculadora de juros compostos",
      "juros compostos online",
      "simulador de investimento",
      "calcular juros compostos",
      "montante juros compostos",
    ],
    intro:
      "Simule seus investimentos com juros compostos. Informe valor inicial, aporte mensal, taxa e prazo para ver o montante final e quanto renderá em juros.",
    content: [
      {
        heading: "O que são juros compostos",
        paragraphs: [
          "Juros compostos são calculados sobre o montante acumulado, ou seja, os juros geram novos juros a cada período. É o modelo usado pela maioria dos investimentos e empréstimos.",
          "Por isso, o tempo é o maior aliado de quem investe: quanto mais cedo você começa, mais os juros se multiplicam. Albert Einstein teria chamado os juros compostos de \"a oitava maravilha do mundo\".",
        ],
      },
      {
        heading: "Fórmula dos juros compostos",
        paragraphs: [
          "Montante = valorInicial × (1 + i)^n + aporteMensal × [((1 + i)^n − 1) ÷ i]",
          "Onde i é a taxa por período (em decimal) e n é o número de períodos. Os aportes mensais são somados considerando juros sobre cada depósito.",
        ],
      },
    ],
    howTo: [
      "Digite o valor inicial do investimento.",
      "Informe o aporte mensal (se houver).",
      "Defina a taxa de juros ao mês ou ao ano.",
      "Escolha o prazo em meses ou anos.",
      "Veja o montante final, o total investido e os juros ganhos.",
    ],
    example:
      "Exemplo: R$ 1.000 iniciais + R$ 200 por mês a 1% ao mês por 12 meses gera um montante de aproximadamente R$ 3.570,00, dos quais cerca de R$ 170 são juros.",
    benefits: [
      "Simula aportes mensais e valor inicial juntos",
      "Mostra total investido e total de juros separadamente",
      "Ajuda a planejar metas financeiras de longo prazo",
    ],
    faq: [
      {
        q: "Qual a diferença entre juros simples e compostos?",
        a: "Nos juros simples, a taxa incide sempre sobre o valor inicial. Nos compostos, incide sobre o saldo acumulado, gerando juros sobre juros e crescendo mais rápido.",
      },
      {
        q: "A taxa deve ser ao mês ou ao ano?",
        a: "Você pode escolher. O importante é que a taxa e o prazo estejam na mesma unidade de tempo para o cálculo estar correto.",
      },
      {
        q: "Posso simular aportes mensais?",
        a: "Sim. Informe o valor do aporte mensal e a calculadora considera cada depósito rendendo a partir do mês em que é feito.",
      },
    ],
    popular: true,
    howToSteps: [
      "Informe o valor inicial do investimento.",
      "Informe o aporte mensal e a taxa de juros.",
      "Defina o prazo e leia o montante final e os juros ganhos.",
    ],
  },
  {
    slug: "calculadora-juros-simples",
    title: "Calculadora de Juros Simples",
    name: "Juros Simples",
    category: "calculadoras",
    icon: "Banknote",
    tagline: "Calcule juros simples de forma direta e sem erro.",
    description:
      "Calculadora de juros simples online grátis. Descubra os juros e o montante final informando capital, taxa e tempo.",
    keywords: [
      "calculadora de juros simples",
      "juros simples online",
      "calcular juros simples",
      "fórmula juros simples",
    ],
    intro:
      "Calcule juros simples informando capital, taxa e tempo. Veja o valor dos juros e o montante total na hora.",
    content: [
      {
        heading: "O que são juros simples",
        paragraphs: [
          "Nos juros simples, a taxa de juros incide sempre sobre o valor inicial (capital). Isso significa que o valor dos juros é o mesmo a cada período.",
          "É comum em financiamentos de curto prazo e em algumas modalidades de empréstimo. Para investimentos de longo prazo, os juros compostos costumam ser mais vantajosos.",
        ],
      },
      {
        heading: "Fórmula dos juros simples",
        paragraphs: [
          "Juros = Capital × Taxa × Tempo",
          "Montante = Capital + Juros",
          "Atenção: a taxa e o tempo precisam estar na mesma unidade. Se a taxa for ao mês, o tempo deve ser em meses.",
        ],
      },
    ],
    howTo: [
      "Digite o capital (valor inicial).",
      "Informe a taxa de juros (ao mês ou ao ano).",
      "Defina o tempo, na mesma unidade da taxa.",
      "Veja os juros e o montante total automaticamente.",
    ],
    example:
      "Exemplo: R$ 1.000 a 2% ao mês por 6 meses gera R$ 120 de juros e um montante de R$ 1.120.",
    benefits: [
      "Cálculo direto e transparente",
      "Mostra juros e montante separadamente",
      "Ideal para empréstimos de curto prazo",
    ],
    faq: [
      {
        q: "Quando usar juros simples?",
        a: "Use quando a taxa incidir sempre sobre o valor original, geralmente em operações de curto prazo como algumas modalidades de empréstimo e venda a prazo.",
      },
      {
        q: "Posso misturar taxa ao mês com tempo em anos?",
        a: "Não diretamente. Converta para a mesma unidade antes de calcular para obter o resultado correto.",
      },
    ],
  },
  {
    slug: "calculadora-financiamento",
    title: "Calculadora de Financiamento",
    name: "Financiamento",
    category: "calculadoras",
    icon: "Landmark",
    tagline: "Simule parcelas e custos totais do seu financiamento.",
    description:
      "Calculadora de financiamento online grátis. Simule parcelas pela Tabela Price, valor total e total de juros do seu empréstimo.",
    keywords: [
      "calculadora de financiamento",
      "tabela price",
      "calcular parcela financiamento",
      "simulador de empréstimo",
      "financiamento online",
    ],
    intro:
      "Simule o valor das parcelas do seu financiamento usando o sistema Price. Informe o valor, a taxa e o número de parcelas para ver o custo total.",
    content: [
      {
        heading: "Como funciona a Tabela Price",
        paragraphs: [
          "Na Tabela Price, as parcelas são fixas durante todo o prazo. No início, a maior parte da parcela paga juros; com o tempo, a proporção se inverte e mais vai para a amortização do principal.",
          "É o sistema mais comum em financiamentos imobiliários e de veículos. A calculadora usa a fórmula padrão da prestação fixa.",
        ],
      },
      {
        heading: "Fórmula da parcela Price",
        paragraphs: [
          "Parcela = Principal × [i × (1 + i)^n] ÷ [(1 + i)^n − 1]",
          "Onde i é a taxa por período e n é o número de parcelas. A calculadora faz essa conta e ainda mostra o total de juros pagos.",
        ],
      },
    ],
    howTo: [
      "Digite o valor a ser financiado.",
      "Informe a taxa de juros por período.",
      "Defina o número de parcelas.",
      "Veja o valor da parcela, o total pago e os juros totais.",
    ],
    example:
      "Exemplo: R$ 20.000 em 24 parcelas a 1,5% ao mês gera parcelas de aproximadamente R$ 999,48 e um total pago de cerca de R$ 23.987.",
    benefits: [
      "Calcula parcela fixa pela Tabela Price",
      "Mostra custo total e juros pagos",
      "Útil para comparar diferentes prazos e taxas",
    ],
    faq: [
      {
        q: "A calculadora considera seguros e tarifas?",
        a: "Não. O cálculo considera apenas o principal, a taxa e o número de parcelas. Em um financiamento real, podem haver seguros e tarifas adicionais.",
      },
      {
        q: "Tabela Price e SAC são iguais?",
        a: "Não. Na Price as parcelas são fixas; no SAC as parcelas diminuem ao longo do tempo, pois a amortização do principal é constante.",
      },
    ],
  },
  {
    slug: "calculadora-desconto",
    title: "Calculadora de Desconto",
    name: "Desconto",
    category: "calculadoras",
    icon: "BadgePercent",
    tagline: "Descubra o preço final de qualquer promoção.",
    description:
      "Calculadora de desconto online grátis. Saiba o valor do desconto e o preço final a partir do preço original e do percentual de desconto.",
    keywords: [
      "calculadora de desconto",
      "calcular desconto",
      "preço com desconto",
      "promoção",
      "desconto percentual",
    ],
    intro:
      "Calcule o desconto de qualquer produto informando o preço original e o percentual. Veja na hora quanto você economiza e o preço final.",
    content: [
      {
        heading: "Como calcular desconto",
        paragraphs: [
          "Para calcular um desconto, multiplique o preço original pelo percentual de desconto dividido por 100. Esse é o valor que será abatido.",
          "Em seguida, subtraia esse valor do preço original para obter o preço final. A calculadora faz ambos os passos automaticamente.",
        ],
      },
    ],
    howTo: [
      "Digite o preço original do produto.",
      "Informe o percentual de desconto.",
      "Veja o valor do desconto e o preço final.",
    ],
    example:
      "Exemplo: um produto de R$ 250 com 30% de desconto fica por R$ 175, com economia de R$ 75.",
    benefits: [
      "Mostra economia e preço final",
      "Aceita descontos cumulativos com dois cálculos",
      "Essencial para compras em promoções",
    ],
    faq: [
      {
        q: "Como calcular dois descontos juntos?",
        a: "Aplique o primeiro desconto sobre o preço original e, depois, o segundo sobre o resultado. Cada desconto incide sobre o valor já reduzido.",
      },
      {
        q: "Como achar o percentual de desconto?",
        a: "Divida a diferença entre o preço original e o final pelo preço original e multiplique por 100.",
      },
    ],
  },
  {
    slug: "calculadora-regra-tres",
    title: "Calculadora Regra de Três",
    name: "Regra de Três",
    category: "calculadoras",
    icon: "Scale",
    tagline: "Resolva proporções diretas e inversas rapidamente.",
    description:
      "Calculadora de regra de três online grátis. Resolva proporções diretas e inversas com três valores conhecidos de forma rápida e sem erro.",
    keywords: [
      "calculadora regra de três",
      "regra de três online",
      "proporção direta",
      "proporção inversa",
      "calcular regra de três",
    ],
    intro:
      "Resolva uma regra de três informando três valores. Escolha entre proporção direta ou inversa e obtenha o quarto valor na hora.",
    content: [
      {
        heading: "O que é regra de três",
        paragraphs: [
          "A regra de três é um método para encontrar um quarto valor a partir de três conhecidos, quando existe uma relação de proporcionalidade entre eles.",
          "Na proporção direta, quando um valor aumenta, o outro também aumenta. Na inversa, quando um aumenta, o outro diminui na mesma proporção.",
        ],
      },
      {
        heading: "Fórmulas",
        paragraphs: [
          "Direta: x = (b × c) ÷ a",
          "Inversa: x = (a × c) ÷ b",
          "A calculadora aplica a fórmula correta conforme o tipo selecionado.",
        ],
      },
    ],
    howTo: [
      "Informe os três valores conhecidos (A, B e C).",
      "Selecione se a proporção é direta ou inversa.",
      "Veja o valor de X calculado automaticamente.",
    ],
    example:
      "Exemplo direto: se 2 cadernos custam R$ 14, então 5 cadernos custam R$ 35.",
    benefits: [
      "Resolve direta e inversa na mesma tela",
      "Útil para matemática, finanças e estudos",
      "Resultado instantâneo",
    ],
    faq: [
      {
        q: "Quando usar regra de três inversa?",
        a: "Quando as grandezas são inversamente proporcionais: por exemplo, mais operários trabalhando levam menos tempo para concluir a mesma obra.",
      },
      {
        q: "A calculadora resolve regra de três composta?",
        a: "Esta versão resolve regra de três simples (direta e inversa). Para composta, divida o problema em etapas.",
      },
    ],
  },
  {
    slug: "calculadora-salario-liquido",
    title: "Calculadora Salário Líquido",
    name: "Salário Líquido",
    category: "calculadoras",
    icon: "Wallet",
    tagline: "Estime seu salário líquido com INSS e IRRF.",
    description:
      "Calculadora de salário líquido online grátis. Estime o valor líquido considerando descontos de INSS e IRRF de acordo com a tabela vigente.",
    keywords: [
      "calculadora salário líquido",
      "calcular salário líquido",
      "INSS",
      "IRRF",
      "desconto salário",
    ],
    intro:
      "Estime seu salário líquido informando o salário bruto. A calculadora aplica as faixas de INSS e IRRF conforme a tabela vigente.",
    content: [
      {
        heading: "Como é calculado o salário líquido",
        paragraphs: [
          "O salário líquido é o valor que cai na conta após os descontos obrigatórios. Para CLT, os principais são o INSS e o Imposto de Renda (IRRF).",
          "O INSS é calculado por faixas progressivas sobre o salário bruto. O IRRF incide sobre o que sobra após o INSS e, se houver, dependentes. A calculadora usa valores de referência atuais.",
        ],
      },
      {
        heading: "Aviso importante",
        paragraphs: [
          "Os valores são estimativas para fins de planejamento. Os descontos reais podem variar conforme dependentes, outros benefícios e atualizações das tabelas governamentais.",
        ],
      },
    ],
    howTo: [
      "Digite o salário bruto mensal.",
      "Informe o número de dependentes (se houver).",
      "Veja os descontos de INSS e IRRF estimados.",
      "Confira o salário líquido aproximado.",
    ],
    example:
      "Exemplo: um salário bruto de R$ 4.000 sem dependentes gera um líquido estimado de cerca de R$ 3.050 após INSS e IRRF, conforme as faixas vigentes. Com dependentes, o líquido aumenta por conta das deduções no imposto de renda.",
    benefits: [
      "Mostra o detalhamento de cada desconto",
      "Considera dependentes no IRRF",
      "Ajuda a planejar o orçamento",
    ],
    faq: [
      {
        q: "Os valores são exatos?",
        a: "São estimativas baseadas em tabelas de referência. Para valores exatos, consulte o holerite ou o RH da empresa.",
      },
      {
        q: "O cálculo serve para CLT e autônomos?",
        a: "Esta calculadora foca em CLT (INSS e IRRF). Autônomos têm regras diferentes de contribuição.",
      },
    ],
  },
  {
    slug: "calculadora-idade",
    title: "Calculadora de Idade",
    name: "Idade",
    category: "calculadoras",
    icon: "Cake",
    tagline: "Descubra sua idade exata em anos, meses e dias.",
    description:
      "Calculadora de idade online grátis. Descubra sua idade exata em anos, meses, semanas, dias e até horas a partir da data de nascimento.",
    keywords: [
      "calculadora de idade",
      "calcular idade",
      "idade em dias",
      "quantos dias vivi",
      "idade exata",
    ],
    intro:
      "Descubra sua idade exata em anos, meses e dias. Informe sua data de nascimento e veja também o total em semanas e dias.",
    content: [
      {
        heading: "Como a idade é calculada",
        paragraphs: [
          "A calculadora conta o tempo entre a data de nascimento e a data atual, considerando anos completos, meses restantes e dias restantes.",
          "Também é possível ver o total em dias e semanas — curioso para saber quantos dias você já viveu.",
        ],
      },
    ],
    howTo: [
      "Selecione sua data de nascimento.",
      "Opcionalmente, escolha uma data de referência diferente de hoje.",
      "Veja sua idade em anos, meses, dias, semanas e total de dias.",
    ],
    example:
      "Exemplo: quem nasceu em 1º de janeiro de 2000 já viveu mais de 9.000 dias. A calculadora mostra a idade exata em anos, meses e dias, além do total de dias e semanas.",
    benefits: [
      "Mostra idade em várias unidades",
      "Aceita data de referência personalizada",
      "Útil para documentos e curiosidades",
    ],
    faq: [
      {
        q: "Como saber quantos dias vivi?",
        a: "Informe sua data de nascimento e a calculadora mostrará o total exato de dias até hoje.",
      },
      {
        q: "Posso calcular a idade em uma data futura?",
        a: "Sim, basta definir uma data de referência diferente do dia de hoje.",
      },
    ],
  },
  {
    slug: "diferenca-entre-datas",
    title: "Diferença Entre Datas",
    name: "Diferença Entre Datas",
    category: "calculadoras",
    icon: "CalendarRange",
    tagline: "Calcule o intervalo entre duas datas com precisão.",
    description:
      "Calculadora de diferença entre datas online grátis. Descubra quantos dias, meses e anos existem entre duas datas de forma rápida e precisa.",
    keywords: [
      "diferença entre datas",
      "calcular dias entre datas",
      "intervalo entre datas",
      "dias entre datas",
      "calculadora de datas",
    ],
    intro:
      "Calcule o intervalo entre duas datas. Veja o resultado em dias, semanas, meses e anos totais.",
    content: [
      {
        heading: "Para que serve",
        paragraphs: [
          "Calcular a diferença entre datas é útil para planejar prazos, contratos, gestações, viagens e projetos. A ferramenta mostra o intervalo em várias unidades.",
          "A contagem considera os calendários real, incluindo anos bissextos, para um resultado exato.",
        ],
      },
    ],
    howTo: [
      "Informe a data inicial.",
      "Informe a data final.",
      "Veja a diferença em dias, semanas, meses e anos.",
    ],
    example:
      "Exemplo: entre 01/01/2024 e 01/06/2024 há 152 dias, ou aproximadamente 5 meses.",
    benefits: [
      "Resultado em várias unidades",
      "Considera anos bissextos",
      "Essencial para prazos e planejamento",
    ],
    faq: [
      {
        q: "A data inicial conta como um dia?",
        a: "Por padrão, a calculadora conta o intervalo completo entre as duas datas. Para incluir o dia inicial, some um ao resultado em dias.",
      },
      {
        q: "Funciona com datas no passado?",
        a: "Sim, você pode colocar a data final antes da inicial. O resultado será o mesmo intervalo em valor absoluto.",
      },
    ],
  },
  {
    slug: "calculadora-imc",
    title: "Calculadora IMC",
    name: "IMC",
    category: "calculadoras",
    icon: "Activity",
    tagline: "Calcule seu Índice de Massa Corporal em segundos.",
    description:
      "Calculadora de IMC online grátis. Descubra seu Índice de Massa Corporal informando peso e altura e veja em qual faixa você está.",
    keywords: [
      "calculadora IMC",
      "índice de massa corporal",
      "calcular IMC",
      "IMC online",
      "peso e altura",
    ],
    intro:
      "Calcule seu IMC (Índice de Massa Corporal) informando peso e altura. Veja em qual faixa você está de acordo com a OMS.",
    content: [
      {
        heading: "O que é o IMC",
        paragraphs: [
          "O IMC é um cálculo que relaciona peso e altura para avaliar se o peso está adequado. É uma referência amplamente usada, mas não mede gordura corporal diretamente.",
          "As faixas da OMS são: abaixo de 18,5 (abaixo do peso), 18,5 a 24,9 (normal), 25 a 29,9 (sobrepeso) e acima de 30 (obesidade).",
        ],
      },
      {
        heading: "Fórmula do IMC",
        paragraphs: [
          "IMC = peso (kg) ÷ altura (m)²",
          "Por exemplo, 70 kg e 1,75 m: 70 ÷ (1,75 × 1,75) = 22,9 — faixa normal.",
        ],
      },
    ],
    howTo: [
      "Digite seu peso em quilogramas.",
      "Digite sua altura em metros (ex.: 1,75).",
      "Veja o IMC e a faixa correspondente.",
    ],
    example:
      "Exemplo: uma pessoa com 70 kg e 1,75 m tem IMC de 22,9, classificado como peso normal.",
    benefits: [
      "Resultado instantâneo",
      "Classificação automática por faixa",
      "Referência prática para saúde",
    ],
    faq: [
      {
        q: "O IMC funciona para todos?",
        a: "O IMC é uma referência geral e não diferencia massa muscular de gordura. Atletas, idosos e gestantes devem avaliar com um profissional de saúde.",
      },
      {
        q: "Como calcular IMC com altura em centímetros?",
        a: "Divida a altura por 100 para converter em metros antes de usar na fórmula. A calculadora aceita o valor em metros.",
      },
    ],
    popular: true,
  },

  // ===================== CONVERSORES =====================
  {
    slug: "conversor-temperatura",
    title: "Conversor de Temperatura",
    name: "Temperatura",
    category: "conversores",
    icon: "Thermometer",
    tagline: "Converta Celsius, Fahrenheit e Kelvin sem erro.",
    description:
      "Conversor de temperatura online grátis. Converta entre Celsius, Fahrenheit e Kelvin de forma rápida e precisa.",
    keywords: [
      "conversor de temperatura",
      "celsius para fahrenheit",
      "fahrenheit para celsius",
      "kelvin",
      "converter temperatura",
    ],
    intro:
      "Converta entre Celsius, Fahrenheit e Kelvin instantaneamente. Digite um valor e veja as demais escalas atualizarem.",
    content: [
      {
        heading: "Escalas de temperatura",
        paragraphs: [
          "Celsius (°C) é a escala mais usada no mundo. Fahrenheit (°F) é comum nos Estados Unidos. Kelvin (K) é a escala absoluta usada em ciência.",
          "O zero absoluto (0 K) equivale a −273,15 °C, a temperatura mais baixa possível.",
        ],
      },
      {
        heading: "Fórmulas de conversão",
        paragraphs: [
          "Celsius → Fahrenheit: °F = °C × 9/5 + 32",
          "Fahrenheit → Celsius: °C = (°F − 32) × 5/9",
          "Celsius → Kelvin: K = °C + 273,15",
        ],
      },
    ],
    howTo: [
      "Escolha a escala de origem.",
      "Digite o valor a ser convertido.",
      "Veja o resultado nas demais escalas.",
    ],
    example:
      "Exemplo: 25 °C equivalem a 77 °F e 298,15 K.",
    benefits: [
      "Converte entre as três escalas principais",
      "Resultado em tempo real",
      "Útil para estudos, receitas e viagens",
    ],
    faq: [
      {
        q: "Como converter Celsius para Fahrenheit de cabeça?",
        a: "Multiplique a temperatura em Celsius por 9, divida por 5 e some 32. Por exemplo, 20 °C: 20 × 9 = 180; 180 ÷ 5 = 36; 36 + 32 = 68 °F.",
      },
      {
        q: "Kelvin usa grau?",
        a: "Não. Kelvin é uma escala absoluta e não recebe o símbolo de grau. Escreve-se apenas K.",
      },
    ],
    popular: true,
  },
  {
    slug: "conversor-comprimento",
    title: "Conversor de Comprimento",
    name: "Comprimento",
    category: "conversores",
    icon: "Ruler",
    tagline: "Converta metros, pés, polegadas e milhas.",
    description:
      "Conversor de comprimento online grátis. Converta entre metros, quilômetros, pés, polegadas, milhas e muito mais.",
    keywords: [
      "conversor de comprimento",
      "metros para pés",
      "polegadas para cm",
      "milhas para km",
      "converter medidas",
    ],
    intro:
      "Converta entre unidades de comprimento do sistema métrico e imperial. Digite um valor e veja todas as equivalências.",
    content: [
      {
        heading: "Unidades de comprimento",
        paragraphs: [
          "O sistema métrico (metro, quilômetro, centímetro) é usado na maior parte do mundo. O sistema imperial (pés, polegadas, milhas) é comum em países como Estados Unidos e Reino Unido.",
          "A unidade base para conversão é o metro. Todas as outras unidades são derivadas dele.",
        ],
      },
    ],
    howTo: [
      "Escolha a unidade de origem.",
      "Digite o valor.",
      "Veja o resultado em todas as unidades listadas.",
    ],
    example:
      "Exemplo: 1 metro equivale a 3,281 pés, 39,37 polegadas e 0,001 quilômetro.",
    benefits: [
      "Métrico e imperial na mesma tela",
      "Resultado instantâneo em todas as unidades",
      "Útil para viagens, obras e estudos",
    ],
    faq: [
      {
        q: "Quantos centímetros tem uma polegada?",
        a: "Uma polegada equivale a 2,54 centímetros exatamente.",
      },
      {
        q: "Quantos metros tem um pé?",
        a: "Um pé (foot) equivale a aproximadamente 0,3048 metro.",
      },
    ],
  },
  {
    slug: "conversor-peso",
    title: "Conversor de Peso",
    name: "Peso",
    category: "conversores",
    icon: "Scale",
    tagline: "Converta quilogramas, libras, onças e toneladas.",
    description:
      "Conversor de peso online grátis. Converta entre quilogramas, gramas, libras, onças e toneladas com precisão.",
    keywords: [
      "conversor de peso",
      "kg para libras",
      "libras para kg",
      "onças para gramas",
      "converter massa",
    ],
    intro:
      "Converta entre unidades de peso e massa. Digite um valor e veja todas as equivalências atualizarem na hora.",
    content: [
      {
        heading: "Unidades de peso",
        paragraphs: [
          "O sistema métrico usa o grama como base, com quilograma (kg) como unidade comum. O sistema imperial usa libras (lb) e onças (oz).",
          "Para conversões, a referência é: 1 kg = 1000 g = 2,20462 lb = 35,274 oz.",
        ],
      },
    ],
    howTo: [
      "Escolha a unidade de origem.",
      "Digite o valor a converter.",
      "Veja o resultado em todas as unidades.",
    ],
    example:
      "Exemplo: 1 quilograma equivale a 2,2046 libras e 35,274 onças.",
    benefits: [
      "Métrico e imperial juntos",
      "Resultado em tempo real",
      "Útil para receitas, academia e comércio",
    ],
    faq: [
      {
        q: "Quantos quilos tem uma libra?",
        a: "Uma libra equivale a aproximadamente 0,4536 quilograma.",
      },
      {
        q: "Onça de peso é igual a onça fluida?",
        a: "Não. Onça fluida mede volume, enquanto onça (oz) mede peso. São unidades diferentes.",
      },
    ],
  },
  {
    slug: "conversor-volume",
    title: "Conversor de Volume",
    name: "Volume",
    category: "conversores",
    icon: "FlaskConical",
    tagline: "Converta litros, mililitros, galões e xícaras.",
    description:
      "Conversor de volume online grátis. Converta entre litros, mililitros, galões, xícaras e outras unidades de volume.",
    keywords: [
      "conversor de volume",
      "litros para mililitros",
      "galões para litros",
      "xícaras para ml",
      "converter volume",
    ],
    intro:
      "Converta entre unidades de volume: litros, mililitros, galões, xícaras e mais. Resultado instantâneo.",
    content: [
      {
        heading: "Unidades de volume",
        paragraphs: [
          "O litro é a unidade de volume mais comum no dia a dia. Na cozinha, usamos xícaras e colheres. Em países de língua inglesa, o galão é frequente.",
          "Referência: 1 litro = 1000 ml = 4 xícaras (aprox.) = 0,264 galão americano.",
        ],
      },
    ],
    howTo: [
      "Selecione a unidade de origem.",
      "Digite o valor.",
      "Veja as equivalências em todas as unidades.",
    ],
    example:
      "Exemplo: 1 litro equivale a 1000 mililitros e a cerca de 4,227 xícaras.",
    benefits: [
      "Inclui unidades culinárias",
      "Resultado em tempo real",
      "Ótimo para receitas e receitas internacionais",
    ],
    faq: [
      {
        q: "Qual a diferença entre galão americano e imperial?",
        a: "O galão americano equivale a 3,785 litros, enquanto o galão imperial (Reino Unido) equivale a 4,546 litros.",
      },
      {
        q: "Quantos ml tem uma xícara?",
        a: "Uma xícara padrão brasileira tem 240 ml. Nos EUA, a xícara tem cerca de 236,6 ml.",
      },
    ],
  },
  {
    slug: "conversor-area",
    title: "Conversor de Área",
    name: "Área",
    category: "conversores",
    icon: "Square",
    tagline: "Converta m², hectares, acres e pés quadrados.",
    description:
      "Conversor de área online grátis. Converta entre metros quadrados, hectares, acres, pés quadrados e outras unidades de área.",
    keywords: [
      "conversor de área",
      "m2 para hectares",
      "acres para m2",
      "pés quadrados",
      "converter área",
    ],
    intro:
      "Converta entre unidades de área: metros quadrados, hectares, acres, pés quadrados e mais.",
    content: [
      {
        heading: "Unidades de área",
        paragraphs: [
          "O metro quadrado (m²) é a unidade mais comum no Brasil. Para grandes extensões de terra, usa-se o hectare (ha) e, em países de língua inglesa, o acre.",
          "Referência: 1 hectare = 10.000 m² = 2,471 acres.",
        ],
      },
    ],
    howTo: [
      "Selecione a unidade de origem.",
      "Digite o valor.",
      "Veja o resultado em todas as unidades.",
    ],
    example:
      "Exemplo: 1 hectare equivale a 10.000 m² e a aproximadamente 2,471 acres.",
    benefits: [
      "Métrico e imperial",
      "Resultado em tempo real",
      "Essencial para imóveis e agricultura",
    ],
    faq: [
      {
        q: "Quantos m² tem um acre?",
        a: "Um acre equivale a aproximadamente 4.046,86 metros quadrados.",
      },
      {
        q: "Hectare e alqueire são iguais?",
        a: "Não. O hectare é padrão internacional (10.000 m²). O alqueire varia conforme a região do Brasil.",
      },
    ],
  },
  {
    slug: "conversor-velocidade",
    title: "Conversor de Velocidade",
    name: "Velocidade",
    category: "conversores",
    icon: "Gauge",
    tagline: "Converta km/h, mph, nós e m/s.",
    description:
      "Conversor de velocidade online grátis. Converta entre km/h, mph, metros por segundo e nós com precisão.",
    keywords: [
      "conversor de velocidade",
      "km/h para mph",
      "mph para km/h",
      "nós",
      "m/s para km/h",
    ],
    intro:
      "Converta entre unidades de velocidade: km/h, mph, m/s e nós. Resultado instantâneo em todas as escalas.",
    content: [
      {
        heading: "Unidades de velocidade",
        paragraphs: [
          "No Brasil, usamos quilômetros por hora (km/h). Nos Estados Unidos e Reino Unido, milhas por hora (mph). Em navegação e aviação, o nó (knot).",
          "Referência: 1 km/h ≈ 0,621 mph ≈ 0,278 m/s ≈ 0,540 nós.",
        ],
      },
    ],
    howTo: [
      "Escolha a unidade de origem.",
      "Digite o valor.",
      "Veja as equivalências em todas as unidades.",
    ],
    example:
      "Exemplo: 100 km/h equivalem a 62,14 mph, 27,78 m/s e 53,99 nós.",
    benefits: [
      "Converte km/h, mph, m/s e nós",
      "Resultado em tempo real",
      "Útil para viagens e estudos de física",
    ],
    faq: [
      {
        q: "Quantos km/h tem 1 mph?",
        a: "1 milha por hora equivale a aproximadamente 1,609 km/h.",
      },
      {
        q: "O que é um nó?",
        a: "O nó é uma unidade de velocidade usada em navegação, equivalente a uma milha náutica por hora (1,852 km/h).",
      },
    ],
  },
  {
    slug: "conversor-moedas",
    title: "Conversor de Moedas",
    name: "Moedas",
    category: "conversores",
    icon: "DollarSign",
    tagline: "Converta valores entre as principais moedas.",
    description:
      "Conversor de moedas online grátis. Converta entre dólar, euro, real e as principais moedas do mundo usando taxas de referência.",
    keywords: [
      "conversor de moedas",
      "dólar para real",
      "euro para real",
      "cotação de moedas",
      "converter moeda online",
    ],
    intro:
      "Converta entre as principais moedas do mundo. Digite o valor e veja a conversão usando taxas de referência.",
    content: [
      {
        heading: "Sobre as taxas",
        paragraphs: [
          "A calculadora usa taxas de referência para conversão entre moedas. As taxas reais variam ao longo do dia e conforme o canal (bancos, casas de câmbio, cartões).",
          "Para transações efetivas, consulte sempre a cotação praticada no momento da operação.",
        ],
      },
    ],
    howTo: [
      "Selecione a moeda de origem e a de destino.",
      "Digite o valor a converter.",
      "Veja o resultado com base na taxa de referência.",
    ],
    example:
      "Exemplo: US$ 100 a uma taxa de referência de R$ 5,00 equivalem a aproximadamente R$ 500,00. O valor real pode variar conforme spread e IOF cobrado pela instituição.",
    benefits: [
      "Várias moedas suportadas",
      "Resultado instantâneo",
      "Prático para viagens e compras internacionais",
    ],
    faq: [
      {
        q: "As taxas são atualizadas em tempo real?",
        a: "As taxas são de referência e podem não refletir a cotação comercial do instante. Para valores oficiais, consulte o Banco Central ou sua instituição.",
      },
      {
        q: "Posso confiar no valor para comprar?",
        a: "Use apenas como estimativa. Bancos e cartões aplicam spread e IOF, alterando o valor final.",
      },
    ],
    popular: true,
  },
  {
    slug: "conversor-tempo",
    title: "Conversor de Tempo",
    name: "Tempo",
    category: "conversores",
    icon: "Clock",
    tagline: "Converta segundos, minutos, horas e dias.",
    description:
      "Conversor de tempo online grátis. Converta entre segundos, minutos, horas, dias, semanas e mais.",
    keywords: [
      "conversor de tempo",
      "segundos para minutos",
      "horas para dias",
      "converter tempo",
      "minutos para horas",
    ],
    intro:
      "Converta entre unidades de tempo: segundos, minutos, horas, dias, semanas e mais. Resultado instantâneo.",
    content: [
      {
        heading: "Unidades de tempo",
        paragraphs: [
          "O tempo é medido em segundos, minutos, horas, dias, semanas, meses e anos. A unidade base no SI é o segundo.",
          "Referência: 1 minuto = 60 segundos; 1 hora = 60 minutos; 1 dia = 24 horas.",
        ],
      },
    ],
    howTo: [
      "Selecione a unidade de origem.",
      "Digite o valor.",
      "Veja as equivalências em todas as unidades.",
    ],
    example:
      "Exemplo: 90 minutos equivalem a 1,5 hora, 5400 segundos e 0,0625 dia.",
    benefits: [
      "Converte entre todas as unidades comuns",
      "Resultado em tempo real",
      "Útil para estudos e planejamento",
    ],
    faq: [
      {
        q: "Quantos segundos tem um dia?",
        a: "Um dia tem 86.400 segundos (24 × 60 × 60).",
      },
      {
        q: "Como converter horas em dias?",
        a: "Divida o número de horas por 24. Por exemplo, 48 horas = 2 dias.",
      },
    ],
  },

  // ===================== GERADORES =====================
  {
    slug: "gerador-senhas",
    title: "Gerador de Senhas",
    name: "Senhas",
    category: "geradores",
    icon: "KeyRound",
    tagline: "Crie senhas fortes e aleatórias com segurança.",
    description:
      "Gerador de senhas online grátis. Crie senhas fortes e aleatórias com tamanho personalizado, números, símbolos e letras.",
    keywords: [
      "gerador de senhas",
      "senha forte",
      "criar senha",
      "senha aleatória",
      "gerador de senha online",
    ],
    intro:
      "Crie senhas fortes e aleatórias instantaneamente. Escolha o tamanho e os tipos de caracteres para máxima segurança.",
    content: [
      {
        heading: "O que torna uma senha forte",
        paragraphs: [
          "Uma senha forte é longa e combina letras maiúsculas, minúsculas, números e símbolos. Quanto maior e mais variada, mais difícil de ser quebrada.",
          "Evite senhas com datas de aniversário, nomes ou sequências como 123456. Use uma senha diferente para cada serviço.",
        ],
      },
      {
        heading: "Segurança do gerador",
        paragraphs: [
          "As senhas são geradas no seu próprio navegador usando a API criptográfica Web Crypto, que oferece alta aleatoriedade. Nenhuma senha é enviada para servidores.",
        ],
      },
    ],
    howTo: [
      "Defina o tamanho da senha (recomendado: 16 ou mais).",
      "Marque os tipos de caracteres desejados.",
      "Clique em gerar para criar uma nova senha.",
      "Copie com um clique para usar onde precisar.",
    ],
    example:
      "Exemplo: uma senha de 16 caracteres com letras, números e símbolos tem complexidade suficiente para a maioria dos serviços.",
    benefits: [
      "Geração local e privada",
      "Tamanho e caracteres personalizáveis",
      "Cópia com um clique",
    ],
    faq: [
      {
        q: "As senhas são salvas em algum lugar?",
        a: "Não. Tudo acontece no seu navegador. Nenhuma senha é enviada ou armazenada.",
      },
      {
        q: "Qual o tamanho ideal de senha?",
        a: "Recomenda-se no mínimo 12 caracteres. Para serviços sensíveis, use 16 ou mais.",
      },
    ],
    popular: true,
    howToSteps: [
      "Defina o tamanho e os tipos de caracteres.",
      "Clique em gerar para criar a senha.",
      "Copie a senha gerada para usar com segurança.",
    ],
  },
  {
    slug: "gerador-qrcode",
    title: "Gerador QR Code",
    name: "QR Code",
    category: "geradores",
    icon: "QrCode",
    tagline: "Crie QR Codes para links, textos e contatos.",
    description:
      "Gerador de QR Code online grátis. Crie QR Codes personalizados para links, textos e informações com download em PNG.",
    keywords: [
      "gerador qr code",
      "criar qr code",
      "qr code online grátis",
      "qr code para link",
      "gerar qrcode",
    ],
    intro:
      "Crie QR Codes gratuitos para links, textos e qualquer informação. Gere e baixe em PNG para usar onde quiser.",
    content: [
      {
        heading: "O que é um QR Code",
        paragraphs: [
          "O QR Code é um código bidimensional que pode ser lido pela câmera de qualquer celular. É usado para abrir links, pagar, compartilhar Wi-Fi e muito mais.",
          "Quanto mais curto o conteúdo, mais simples e legível o QR Code. Para links, considere usar encurtadores.",
        ],
      },
    ],
    howTo: [
      "Digite ou cole o conteúdo (link, texto, etc.).",
      "O QR Code é gerado automaticamente.",
      "Baixe a imagem em PNG para usar.",
    ],
    example:
      "Exemplo: cole o link do seu site e baixe o QR Code para imprimir em cartões ou divulgação.",
    benefits: [
      "Geração instantânea",
      "Download em PNG",
      "Funciona para links, textos e contatos",
    ],
    faq: [
      {
        q: "O QR Code expira?",
        a: "Não. O QR Code gerado é estático e funciona para sempre, desde que o conteúdo continue válido.",
      },
      {
        q: "Posso usar comercialmente?",
        a: "Sim. Os QR Codes gerados são livres para uso pessoal e comercial.",
      },
    ],
    popular: true,
  },
  {
    slug: "gerador-lorem-ipsum",
    title: "Gerador Lorem Ipsum",
    name: "Lorem Ipsum",
    category: "geradores",
    icon: "AlignLeft",
    tagline: "Gere texto de preenchimento para seus projetos.",
    description:
      "Gerador Lorem Ipsum online grátis. Crie parágrafos, frases e palavras de texto de preenchimento para layouts e protótipos.",
    keywords: [
      "gerador lorem ipsum",
      "lorem ipsum online",
      "texto de preenchimento",
      "dummy text",
      "gerar parágrafos",
    ],
    intro:
      "Gere texto Lorem Ipsum para preencher layouts e protótipos. Escolha quantos parágrafos, frases ou palavras deseja.",
    content: [
      {
        heading: "O que é Lorem Ipsum",
        paragraphs: [
          "Lorem Ipsum é um texto fictício usado há séculos na tipografia e no design para preencher espaços e testar layouts sem distrair com o conteúdo.",
          "É útil para designers e desenvolvedores que precisam visualizar como um texto se comporta em uma interface antes do conteúdo real.",
        ],
      },
    ],
    howTo: [
      "Escolha a unidade (parágrafos, frases ou palavras).",
      "Defina a quantidade desejada.",
      "Copie o texto gerado com um clique.",
    ],
    example:
      "Exemplo: gere 3 parágrafos para preencher a área de conteúdo de um mockup de blog.",
    benefits: [
      "Parágrafos, frases ou palavras",
      "Cópia com um clique",
      "Ideal para designers e desenvolvedores",
    ],
    faq: [
      {
        q: "Lorem Ipsum significa algo?",
        a: "Não tem significado real. É derivado de um texto de Cícero, mas alterado para não ser legível como texto comum.",
      },
      {
        q: "Posso usar em projetos comerciais?",
        a: "Sim, é livre para qualquer uso, inclusive comercial.",
      },
    ],
  },
  {
    slug: "gerador-nomes",
    title: "Gerador de Nomes",
    name: "Nomes",
    category: "geradores",
    icon: "User",
    tagline: "Gere nomes aleatórios para personagens e projetos.",
    description:
      "Gerador de nomes online grátis. Crie nomes aleatórios para personagens, projetos, testes e cadastros com um clique.",
    keywords: [
      "gerador de nomes",
      "nome aleatório",
      "gerar nomes",
      "nomes fictícios",
      "gerador de nomes online",
    ],
    intro:
      "Gere nomes aleatórios para personagens, testes e projetos. Escolha a quantidade e copie os nomes gerados.",
    content: [
      {
        heading: "Para que serve um gerador de nomes",
        paragraphs: [
          "Um gerador de nomes é útil para criar personagens, preencher bancos de dados de teste, escolher nomes para projetos e muito mais.",
          "Os nomes gerados são fictícios e combinam nomes e sobrenomes comuns para criar combinações variadas.",
        ],
      },
    ],
    howTo: [
      "Defina quantos nomes deseja gerar.",
      "Clique em gerar.",
      "Copie os nomes para usar onde precisar.",
    ],
    example:
      "Exemplo: gere 10 nomes para popular uma lista de usuários de teste em um sistema.",
    benefits: [
      "Gera vários nomes de uma vez",
      "Nomes fictícios e variados",
      "Cópia rápida",
    ],
    faq: [
      {
        q: "Os nomes são reais?",
        a: "Os nomes são combinações aleatórias de nomes e sobrenomes comuns. São fictícios e qualquer semelhança com pessoas reais é coincidência.",
      },
      {
        q: "Posso usar para cadastro real?",
        a: "Use apenas para testes e projetos fictícios. Para cadastros reais, use seus dados verdadeiros.",
      },
    ],
  },
  {
    slug: "gerador-hash",
    title: "Gerador Hash",
    name: "Hash",
    category: "geradores",
    icon: "Hash",
    tagline: "Gere hashes MD5, SHA-1, SHA-256 e mais.",
    description:
      "Gerador de hash online grátis. Calcule hashes MD5, SHA-1, SHA-256 e SHA-512 de qualquer texto diretamente no navegador.",
    keywords: [
      "gerador de hash",
      "calcular hash",
      "sha256 online",
      "md5 online",
      "gerar hash",
    ],
    intro:
      "Calcule hashes de qualquer texto usando MD5, SHA-1, SHA-256 e SHA-512. Tudo processado no seu navegador.",
    content: [
      {
        heading: "O que é um hash",
        paragraphs: [
          "Um hash é uma assinatura digital de tamanho fixo gerada a partir de um conteúdo. A mesma entrada sempre gera o mesmo hash, e é impraticável reverter.",
          "Hashes são usados para verificar integridade de arquivos, armazenar senhas e assinar dados. MD5 e SHA-1 são considerados fracos para segurança; prefira SHA-256.",
        ],
      },
    ],
    howTo: [
      "Digite ou cole o texto.",
      "Veja os hashes gerados automaticamente em vários algoritmos.",
      "Copie o hash desejado com um clique.",
    ],
    example:
      "Exemplo: o texto \"toolium\" gera um hash SHA-256 único que pode ser usado para verificar integridade.",
    benefits: [
      "Vários algoritmos de uma vez",
      "Cálculo local e privado",
      "Cópia rápida de cada hash",
    ],
    faq: [
      {
        q: "É possível reverter um hash?",
        a: "Não diretamente. Hashes são funções de mão única. O que se faz é comparar hashes, e não decifrá-los.",
      },
      {
        q: "Qual algoritmo usar?",
        a: "Para segurança, use SHA-256 ou superior. MD5 e SHA-1 não são recomendados para fins de segurança.",
      },
    ],
  },
  {
    slug: "gerador-cores",
    title: "Gerador de Cores",
    name: "Cores",
    category: "geradores",
    icon: "Palette",
    tagline: "Gere paletas e códigos de cor para seus projetos.",
    description:
      "Gerador de cores online grátis. Crie cores aleatórias, veja códigos HEX, RGB e HSL e gere paletas para seus projetos.",
    keywords: [
      "gerador de cores",
      "paleta de cores",
      "hex para rgb",
      "cor aleatória",
      "gerar paleta online",
    ],
    intro:
      "Gere cores aleatórias e veja os códigos HEX, RGB e HSL. Crie paletas harmoniosas para seus projetos de design.",
    content: [
      {
        heading: "Sistemas de cor",
        paragraphs: [
          "HEX é a representação hexadecimal usada em web (#RRGGBB). RGB descreve a cor pela intensidade de vermelho, verde e azul. HSL descreve matiz, saturação e luminosidade.",
          "Para paletas harmoniosas, combine cores análogas (próximas no círculo cromático) ou complementares (opostas).",
        ],
      },
    ],
    howTo: [
      "Clique em gerar para criar uma cor aleatória.",
      "Veja os códigos HEX, RGB e HSL atualizados.",
      "Copie o código da cor com um clique.",
    ],
    example:
      "Exemplo: gere uma cor e copie o código HEX para usar no CSS do seu site.",
    benefits: [
      "Códigos em HEX, RGB e HSL",
      "Geração aleatória com um clique",
      "Útil para designers e desenvolvedores",
    ],
    faq: [
      {
        q: "Como converter HEX para RGB?",
        a: "Cada par de caracteres hexadecimais representa um canal: #FF8800 equivale a RGB(255, 136, 0). A ferramenta mostra automaticamente.",
      },
      {
        q: "Como criar uma paleta?",
        a: "Gere uma cor base e use variações de saturação e luminosidade (HSL) para criar tons complementares.",
      },
    ],
  },

  // ===================== IMAGENS =====================
  {
    slug: "compressor-imagem",
    title: "Compressor de Imagem",
    name: "Comprimir Imagem",
    category: "imagens",
    icon: "FileImage",
    tagline: "Reduza o tamanho de imagens sem perder qualidade.",
    description:
      "Compressor de imagem online grátis. Reduza o tamanho de JPG e PNG no navegador, com privacidade total e qualidade ajustável.",
    keywords: [
      "compressor de imagem",
      "reduzir tamanho de imagem",
      "comprimir imagem online",
      "otimizar imagem",
      "compactar foto",
    ],
    intro:
      "Comprima imagens JPG e PNG direto no navegador, sem enviar para servidores. Ajuste a qualidade e baixe o arquivo menor.",
    content: [
      {
        heading: "Por que comprimir imagens",
        paragraphs: [
          "Imagens grandes deixam sites lentos e ocupam espaço. Comprimir reduz o tamanho do arquivo mantendo a aparência quase igual, melhorando o desempenho.",
          "Esta ferramenta processa tudo no seu navegador, então suas imagens nunca saem do seu dispositivo — total privacidade.",
        ],
      },
    ],
    howTo: [
      "Selecione uma imagem do seu computador ou celular.",
      "Ajuste o nível de qualidade desejado.",
      "Baixe a imagem comprimida.",
    ],
    example:
      "Exemplo: uma foto de 4 MB pode ser reduzida para menos de 1 MB com perda visual mínima.",
    benefits: [
      "Processamento local e privado",
      "Qualidade ajustável",
      "Redução significativa de tamanho",
    ],
    faq: [
      {
        q: "As imagens são enviadas para um servidor?",
        a: "Não. Todo o processamento acontece no seu navegador. Suas imagens não saem do seu dispositivo.",
      },
      {
        q: "Qual formato funciona melhor?",
        a: "JPG geralmente comprime mais para fotos. PNG é melhor para imagens com áreas de cor sólida, como logotipos.",
      },
    ],
    popular: true,
  },
  {
    slug: "conversor-jpg-png",
    title: "Conversor JPG para PNG",
    name: "JPG → PNG",
    category: "imagens",
    icon: "FileImage",
    tagline: "Converta JPG para PNG no navegador, com privacidade.",
    description:
      "Conversor JPG para PNG online grátis. Converta imagens JPG para PNG com transparência, direto no navegador.",
    keywords: [
      "conversor jpg para png",
      "jpg para png",
      "converter imagem",
      "png com transparência",
      "converter jpg",
    ],
    intro:
      "Converta imagens JPG para PNG no seu navegador. Rápido, gratuito e sem upload para servidores.",
    content: [
      {
        heading: "Diferença entre JPG e PNG",
        paragraphs: [
          "JPG é ideal para fotos por sua compressão, mas não suporta transparência. PNG suporta transparência e preserva melhor áreas de cor sólida, sendo melhor para logotipos e gráficos.",
          "Converter para PNG é útil quando você precisa de transparência ou de uma imagem sem perdas para editar.",
        ],
      },
    ],
    howTo: [
      "Selecione um arquivo JPG.",
      "A conversão para PNG acontece automaticamente.",
      "Baixe a imagem PNG gerada.",
    ],
    example:
      "Exemplo: converta uma foto JPG em PNG para editar com camadas em um editor de imagens.",
    benefits: [
      "Conversão local e privada",
      "Sem limite de uploads para servidores",
      "Resultado instantâneo",
    ],
    faq: [
      {
        q: "O PNG fica maior que o JPG?",
        a: "Sim, geralmente. PNG não usa compressão com perdas, então o arquivo tende a ser maior, principalmente para fotos.",
      },
      {
        q: "A conversão adiciona transparência?",
        a: "Não automaticamente. A transparência precisa ser aplicada em um editor. A conversão apenas muda o formato.",
      },
    ],
  },
  {
    slug: "conversor-png-webp",
    title: "Conversor PNG para WEBP",
    name: "PNG → WEBP",
    category: "imagens",
    icon: "FileImage",
    tagline: "Converta PNG para WEBP e reduza o tamanho.",
    description:
      "Conversor PNG para WEBP online grátis. Converta imagens PNG para o formato WEBP, mais leve e moderno, no navegador.",
    keywords: [
      "conversor png para webp",
      "png para webp",
      "converter webp",
      "formato webp",
      "otimizar imagem web",
    ],
    intro:
      "Converta imagens PNG para WEBP, um formato moderno que oferece menor tamanho com boa qualidade. Tudo no navegador.",
    content: [
      {
        heading: "Por que usar WEBP",
        paragraphs: [
          "WEBP é um formato do Google que oferece compressão superior a JPG e PNG, suportando transparência. Sites que usam WEBP carregam mais rápido.",
          "Praticamente todos os navegadores modernos suportam WEBP, tornando-o uma excelente escolha para a web.",
        ],
      },
    ],
    howTo: [
      "Selecione um arquivo PNG.",
      "A conversão para WEBP acontece automaticamente.",
      "Baixe a imagem WEBP gerada.",
    ],
    example:
      "Exemplo: converta um logotipo PNG de 200 KB para WEBP e obtenha um arquivo de cerca de 60 KB.",
    benefits: [
      "Menor tamanho com qualidade",
      "Suporta transparência",
      "Processamento local e privado",
    ],
    faq: [
      {
        q: "Todos os navegadores suportam WEBP?",
        a: "Todos os navegadores modernos (Chrome, Firefox, Safari, Edge) suportam WEBP. Navegadores muito antigos não.",
      },
      {
        q: "WEBP suporta transparência?",
        a: "Sim, WEBP suporta transparência (alpha), assim como PNG.",
      },
    ],
  },
  {
    slug: "redimensionador-imagem",
    title: "Redimensionador de Imagem",
    name: "Redimensionar",
    category: "imagens",
    icon: "Scaling",
    tagline: "Mude o tamanho de imagens sem perder qualidade.",
    description:
      "Redimensionador de imagem online grátis. Altere as dimensões de imagens por pixels ou porcentagem, direto no navegador.",
    keywords: [
      "redimensionar imagem",
      "mudar tamanho de imagem",
      "redimensionar foto online",
      "alterar dimensões imagem",
      "comprimir tamanho imagem",
    ],
    intro:
      "Redimensione imagens por pixels ou porcentagem, mantendo ou não a proporção. Tudo processado no seu navegador.",
    content: [
      {
        heading: "Quando redimensionar",
        paragraphs: [
          "Redimensionar é útil para preparar imagens para web, e-mails e redes sociais, que costumam ter requisitos de tamanho específicos.",
          "Ao reduzir dimensões, o arquivo também fica menor, ajudando no desempenho.",
        ],
      },
    ],
    howTo: [
      "Selecione uma imagem.",
      "Defina a nova largura e altura (ou porcentagem).",
      "Mantenha ou não a proporção.",
      "Baixe a imagem redimensionada.",
    ],
    example:
      "Exemplo: reduza uma foto de 4000×3000 para 800×600 para enviá-la por e-mail.",
    benefits: [
      "Por pixels ou porcentagem",
      "Opção de manter proporção",
      "Processamento local e privado",
    ],
    faq: [
      {
        q: "Redimensionar perde qualidade?",
        a: "Ao aumentar, sim, a imagem pode ficar pixelada. Ao reduzir, a perda é mínima e o arquivo fica menor.",
      },
      {
        q: "Como manter a proporção?",
        a: "Ative a opção de manter proporção. Ao alterar a largura, a altura ajusta automaticamente.",
      },
    ],
  },

  // ===================== PRODUTIVIDADE =====================
  {
    slug: "cronometro-online",
    title: "Cronômetro Online",
    name: "Cronômetro",
    category: "produtividade",
    icon: "Timer",
    tagline: "Cronômetro preciso com voltas e controle total.",
    description:
      "Cronômetro online grátis. Marque o tempo com precisão de milissegundos, registre voltas e controle iniciar, parar e zerar.",
    keywords: [
      "cronômetro online",
      "cronometro online grátis",
      "marcar tempo",
      "cronômetro com voltas",
      "timer online",
    ],
    intro:
      "Cronômetro online preciso com milissegundos e registro de voltas. Inicie, pause e zere com um clique.",
    content: [
      {
        heading: "Para que usar um cronômetro online",
        paragraphs: [
          "Um cronômetro online é prático para atividades físicas, estudos, cozinhar, apresentações e qualquer tarefa onde medir o tempo seja importante.",
          "Como roda no navegador, está sempre à mão em qualquer dispositivo, sem instalar nada.",
        ],
      },
    ],
    howTo: [
      "Clique em iniciar para começar a contar.",
      "Use voltas para registrar tempos parciais.",
      "Pause e retome quando precisar.",
      "Zere para começar do zero.",
    ],
    example:
      "Exemplo: use as voltas para registrar o tempo de cada volta em uma corrida.",
    benefits: [
      "Precisão de milissegundos",
      "Registro de voltas",
      "Funciona offline após carregar",
    ],
    faq: [
      {
        q: "O cronômetro continua se eu fechar a aba?",
        a: "Não. O cronômetro roda apenas enquanto a aba estiver aberta. Para sessões longas, mantenha a aba aberta.",
      },
      {
        q: "Funciona no celular?",
        a: "Sim. O cronômetro é responsivo e funciona em qualquer dispositivo com navegador.",
      },
    ],
  },
  {
    slug: "contador-palavras",
    title: "Contador de Palavras",
    name: "Contador de Palavras",
    category: "produtividade",
    icon: "Type",
    tagline: "Conte palavras, caracteres e tempo de leitura.",
    description:
      "Contador de palavras online grátis. Conte palavras, caracteres, frases e tempo de leitura de qualquer texto instantaneamente.",
    keywords: [
      "contador de palavras",
      "contar palavras online",
      "contador de caracteres",
      "tempo de leitura",
      "contar caracteres",
    ],
    intro:
      "Conte palavras, caracteres, frases e parágrafos de qualquer texto. Veja também o tempo estimado de leitura.",
    content: [
      {
        heading: "Por que contar palavras",
        paragraphs: [
          "Contar palavras é essencial para redações, artigos, posts e textos com limite de tamanho. Saber o tempo de leitura ajuda a planejar conteúdo para a web.",
          "A média de leitura de um adulto é cerca de 200 palavras por minuto.",
        ],
      },
    ],
    howTo: [
      "Cole ou digite o texto na área de entrada.",
      "Veja as estatísticas atualizarem em tempo real.",
      "Use os contadores para ajustar o tamanho do texto.",
    ],
    example:
      "Exemplo: um texto de 400 palavras tem tempo de leitura estimado de 2 minutos.",
    benefits: [
      "Contagem em tempo real",
      "Inclui caracteres, frases e parágrafos",
      "Tempo de leitura estimado",
    ],
    faq: [
      {
        q: "Como o tempo de leitura é calculado?",
        a: "Dividimos o número de palavras por 200 (média de leitura). Um texto de 400 palavras leva cerca de 2 minutos.",
      },
      {
        q: "Os dados são enviados para algum servidor?",
        a: "Não. A contagem acontece no seu navegador. Seu texto não é enviado para lugar algum.",
      },
    ],
  },
  {
    slug: "conversor-fuso-horario",
    title: "Conversor de Fuso Horário",
    name: "Fuso Horário",
    category: "produtividade",
    icon: "Globe",
    tagline: "Compare horários em diferentes fusos do mundo.",
    description:
      "Conversor de fuso horário online grátis. Compare horários entre cidades e fusos do mundo para reuniões e viagens.",
    keywords: [
      "conversor de fuso horário",
      "fuso horário online",
      "diferença de horário",
      "hora mundial",
      "comparar fusos",
    ],
    intro:
      "Compare horários entre diferentes fusos horários do mundo. Veja a diferença entre cidades para planejar reuniões e viagens.",
    content: [
      {
        heading: "Como funcionam os fusos horários",
        paragraphs: [
          "A Terra é dividida em 24 fusos horários, cada um com cerca de 15 graus de longitude. Cada fuso tem uma hora de diferença em relação ao vizinho.",
          "Alguns países adotam horário de verão, alterando o fuso durante parte do ano. A ferramenta usa o fuso oficial atual.",
        ],
      },
    ],
    howTo: [
      "Selecione a cidade ou fuso de origem.",
      "Selecione a cidade ou fuso de destino.",
      "Veja a hora correspondente em cada local.",
    ],
    example:
      "Exemplo: quando são 14h em São Paulo (BRT), são 18h em Londres e 13h em Nova York (variando com o horário de verão).",
    benefits: [
      "Comparação em tempo real",
      "Várias cidades do mundo",
      "Prático para reuniões internacionais",
    ],
    faq: [
      {
        q: "As horas consideram horário de verão?",
        a: "Sim, o navegador usa o fuso oficial atual, que já considera horário de verão quando aplicável.",
      },
      {
        q: "Por que a diferença entre duas cidades muda?",
        a: "Porque países diferentes adotam horário de verão em datas diferentes, alterando a diferença entre eles ao longo do ano.",
      },
    ],
  },
  {
    slug: "checklist-online",
    name: "Checklist Online",
    title: "Checklist Online",
    category: "produtividade",
    icon: "ListChecks",
    tagline: "Crie listas de tarefas e marque o que fez.",
    description:
      "Checklist online grátis. Crie listas de tarefas, marque itens concluídos e organize seu dia — tudo salvo no seu navegador.",
    keywords: [
      "checklist online",
      "lista de tarefas",
      "to-do list",
      "lista de afazeres",
      "checklist grátis",
    ],
    intro:
      "Crie listas de tarefas e marque itens conforme conclui. Sua lista fica salva no navegador para você voltar quando quiser.",
    content: [
      {
        heading: "Por que usar um checklist",
        paragraphs: [
          "Listas de tarefas ajudam a organizar o dia, não esquecer compromissos e sentir a satisfação de concluir itens. Reduz a carga mental e melhora a produtividade.",
          "Esta ferramenta salva sua lista no armazenamento local do navegador, então você pode voltar depois e continuar de onde parou.",
        ],
      },
    ],
    howTo: [
      "Digite uma tarefa e pressione enter para adicionar.",
      "Marque o quadrado para concluir um item.",
      "Use o ícone de lixo para remover itens.",
      "Sua lista fica salva automaticamente.",
    ],
    example:
      "Exemplo: crie uma checklist de compras e marque os itens enquanto compra.",
    benefits: [
      "Salva automaticamente no navegador",
      "Adicionar e remover com um clique",
      "Funciona offline após carregar",
    ],
    faq: [
      {
        q: "Minha lista some se fechar o navegador?",
        a: "Não. A lista é salva no armazenamento local do navegador e permanece disponível ao retornar.",
      },
      {
        q: "Posso usar no celular?",
        a: "Sim, a ferramenta é responsiva e funciona em qualquer dispositivo com navegador.",
      },
    ],
  },
]

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category)
}

export function getPopularTools(): Tool[] {
  return tools.filter((t) => t.popular)
}

export function getAllSlugs(): string[] {
  return tools.map((t) => t.slug)
}
