const img = (seed) => `https://picsum.photos/seed/${seed}/640/480`;

export const products = [
  {
    id: 'p1',
    nome: 'Cama Articulada Elétrica 3 Posições',
    categoria: 'camas',
    preco: 89900,
    precoAntigo: 99900,
    stock: 6,
    avaliacao: 4.8,
    imagem: img('cama-eletrica'),
    curta: 'Cama hospitalar com comando elétrico, grades laterais e rodízios com travão.',
    descricao: 'Cama articulada elétrica com três secções ajustáveis (costas, joelhos e altura), estrutura em aço reforçado, grades de segurança rebatíveis e rodízios com travão individual. Ideal para cuidados prolongados em casa, proporcionando conforto e segurança à pessoa acamada e facilitando o trabalho do cuidador.',
    especificacoes: { 'Carga máxima': '150 kg', Comando: 'Elétrico com controlo manual', Grades: 'Rebatíveis em ambos os lados', Garantia: '24 meses' }
  },
  {
    id: 'p2',
    nome: 'Colchão Anti-escaras de Ar Alternado',
    categoria: 'anti-escaras',
    preco: 24900,
    stock: 15,
    avaliacao: 4.6,
    imagem: img('colchao-antiescaras'),
    curta: 'Sistema de pressão alternada que reduz o risco de úlceras de pressão.',
    descricao: 'Colchão de células de ar com compressor silencioso, indicado para prevenção e tratamento de úlceras de pressão em utentes acamados de longa duração. Capa impermeável e lavável.',
    especificacoes: { Motor: 'Silencioso <25dB', Capa: 'Impermeável, removível', 'Carga máxima': '135 kg' }
  },
  {
    id: 'p3',
    nome: 'Cadeira de Rodas Dobrável Standard',
    categoria: 'cadeiras-rodas',
    preco: 32900,
    stock: 10,
    avaliacao: 4.7,
    imagem: img('cadeira-rodas'),
    curta: 'Estrutura leve e dobrável, apoios de pés removíveis, travões duplos.',
    descricao: 'Cadeira de rodas manual com estrutura em alumínio leve, dobrável para transporte fácil, apoios de pés e braços removíveis, travões de segurança nas duas rodas traseiras.',
    especificacoes: { Peso: '14 kg', 'Carga máxima': '120 kg', 'Largura assento': '46 cm' }
  },
  {
    id: 'p4',
    nome: 'Andarilho Dobrável com Assento',
    categoria: 'mobilidade',
    preco: 15900,
    stock: 20,
    avaliacao: 4.5,
    imagem: img('andarilho'),
    curta: 'Andarilho com assento acolchoado, cesto e travões de mão.',
    descricao: 'Andarilho dobrável em alumínio com assento acolchoado para descanso, cesto de arrumação, travões de mão e altura ajustável em vários níveis.',
    especificacoes: { Peso: '7 kg', 'Carga máxima': '130 kg', Altura: 'Ajustável 5 níveis' }
  },
  {
    id: 'p5',
    nome: 'Cadeira Sanitária com Rodas',
    categoria: 'higiene',
    preco: 21900,
    stock: 12,
    avaliacao: 4.4,
    imagem: img('cadeira-sanitaria'),
    curta: 'Cadeira sanitária e de banho com balde removível e rodas com travão.',
    descricao: 'Cadeira multifuncional para higiene pessoal, com assento almofadado, balde removível, encosto reclinável e rodas com travão para maior segurança nas transferências.',
    especificacoes: { Material: 'Alumínio anti-corrosão', 'Carga máxima': '120 kg' }
  },
  {
    id: 'p6',
    nome: 'Fraldas Geriátricas Super Absorventes (Pack 30)',
    categoria: 'fraldas',
    preco: 3490,
    stock: 80,
    avaliacao: 4.6,
    imagem: img('fraldas'),
    curta: 'Fraldas para adulto com elevada absorção, tiras adesivas reajustáveis.',
    descricao: 'Fraldas geriátricas de alta absorção com indicador de humidade, barreiras anti-fugas e tiras adesivas reajustáveis para maior conforto e discrição.',
    especificacoes: { Tamanhos: 'M / L / XL', Unidades: '30 por pacote' }
  },
  {
    id: 'p7',
    nome: 'Almofada Anti-escaras em Espuma Viscoelástica',
    categoria: 'anti-escaras',
    preco: 8900,
    stock: 25,
    avaliacao: 4.5,
    imagem: img('almofada-viscoelastica'),
    curta: 'Distribuição uniforme de pressão para maior conforto sentado.',
    descricao: 'Almofada em espuma viscoelástica de alta densidade com corte ergonómico, indicada para utilização prolongada em cadeira de rodas ou cadeirão.',
    especificacoes: { Material: 'Espuma viscoelástica', Capa: 'Removível e lavável' }
  },
  {
    id: 'p8',
    nome: 'Elevador de Transferência Hidráulico',
    categoria: 'mobilidade',
    preco: 129900,
    stock: 4,
    avaliacao: 4.9,
    imagem: img('elevador-hidraulico'),
    curta: 'Elevador hidráulico para transferências seguras cama-cadeira.',
    descricao: 'Elevador de transferência com sistema hidráulico manual, faixa de suporte acolchoada e base com rodas travantes, facilitando transferências seguras entre cama, cadeira de rodas e casa de banho.',
    especificacoes: { 'Carga máxima': '135 kg', Sistema: 'Hidráulico manual' }
  },
  {
    id: 'p9',
    nome: 'Kit Alimentação Entérica (Sonda + Seringas)',
    categoria: 'alimentacao',
    preco: 5900,
    stock: 30,
    avaliacao: 4.3,
    imagem: img('kit-alimentacao'),
    curta: 'Kit completo para alimentação entérica com seringas graduadas.',
    descricao: 'Kit para alimentação entérica composto por sonda de silicone macio e seringas graduadas de vários tamanhos, esterilizado e de uso único.',
    especificacoes: { Material: 'Silicone medicinal', Unidades: 'Kit com 5 conjuntos' }
  },
  {
    id: 'p10',
    nome: 'Oxímetro de Pulso Digital',
    categoria: 'monitorizacao',
    preco: 3900,
    stock: 40,
    avaliacao: 4.7,
    imagem: img('oximetro'),
    curta: 'Mede saturação de oxigénio e frequência cardíaca em segundos.',
    descricao: 'Oxímetro de dedo com ecrã digital de fácil leitura, medição rápida da saturação de oxigénio (SpO2) e frequência cardíaca, essencial para monitorização diária.',
    especificacoes: { Ecrã: 'LED digital', Pilhas: '2x AAA incluídas' }
  },
  {
    id: 'p11',
    nome: 'Grade de Proteção para Cama',
    categoria: 'camas',
    preco: 9900,
    stock: 18,
    avaliacao: 4.4,
    imagem: img('grade-cama'),
    curta: 'Grade de segurança dobrável para prevenir quedas durante o sono.',
    descricao: 'Grade de proteção lateral dobrável, fácil de instalar na maioria das camas, ajuda a prevenir quedas e dá segurança acrescida durante a noite.',
    especificacoes: { Material: 'Aço com pintura epóxi', Compatibilidade: 'Camas standard e articuladas' }
  },
  {
    id: 'p12',
    nome: 'Cadeira de Banho Reclinável',
    categoria: 'higiene',
    preco: 27900,
    stock: 9,
    avaliacao: 4.6,
    imagem: img('cadeira-banho'),
    curta: 'Reclinação total para banho assistido de utentes acamados.',
    descricao: 'Cadeira de banho com reclinação total, apoio de cabeça acolchoado e rodas de grande diâmetro, permitindo banho assistido confortável e seguro.',
    especificacoes: { Reclinação: '0-170º', 'Carga máxima': '140 kg' }
  }
];

export const getProductById = (id) => products.find((p) => p.id === id);

export const formatPrice = (cents) =>
  (cents / 100).toLocaleString('pt-PT', { style: 'currency', currency: 'CVE', minimumFractionDigits: 0 });
