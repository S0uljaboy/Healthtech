import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['info'] });

async function main() {
  console.log('🌱 Starting seed...');

  // Clean DB (if needed, but for safe seed we just upsert or create if not exists)
  // await prisma.referral.deleteMany();
  // await prisma.assessmentAnswer.deleteMany();
  // await prisma.assessmentSession.deleteMany();
  // await prisma.observationCategory.deleteMany();
  // await prisma.observation.deleteMany();
  // await prisma.student.deleteMany();
  // await prisma.classroom.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.school.deleteMany();
  // await prisma.tenant.deleteMany();

  // Create Tenant
  const tenant = await prisma.tenant.create({
    data: { name: 'Colégio Alpha Saúde' }
  });

  console.log(`Created tenant: ${tenant.name}`);

  // Create School
  const school = await prisma.school.create({
    data: { name: 'Unidade Central', tenantId: tenant.id }
  });

  // Create Classrooms
  const classA = await prisma.classroom.create({
    data: { name: '1º Ano A', schoolId: school.id }
  });
  const classB = await prisma.classroom.create({
    data: { name: '2º Ano B', schoolId: school.id }
  });

  // Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@alpha.com',
      name: 'Administrador Alpha',
      role: 'admin',
      tenantId: tenant.id,
    }
  });

  const teacher = await prisma.user.create({
    data: {
      email: 'prof@alpha.com',
      name: 'Prof. Marina Silva',
      role: 'teacher',
      tenantId: tenant.id,
    }
  });

  const psychologist = await prisma.user.create({
    data: {
      email: 'psico@alpha.com',
      name: 'Dr. Roberto Costa',
      role: 'psychologist',
      tenantId: tenant.id,
    }
  });

  const parent = await prisma.user.create({
    data: {
      email: 'pai@alpha.com',
      name: 'Sr. Fernando Santos',
      role: 'parent',
      tenantId: tenant.id,
    }
  });

  // Create Students
  const student1 = await prisma.student.create({
    data: {
      fullName: 'Lucas Santos',
      birthDate: new Date('2015-04-10'),
      gender: 'M',
      tenantId: tenant.id,
      schoolId: school.id,
      classroomId: classA.id,
      riskLevel: 'ELEVATED',
      tags: JSON.stringify(['TDAH Suspeita', 'Atenção']),
    }
  });

  const student2 = await prisma.student.create({
    data: {
      fullName: 'Julia Mendes',
      birthDate: new Date('2016-08-22'),
      gender: 'F',
      tenantId: tenant.id,
      schoolId: school.id,
      classroomId: classB.id,
      riskLevel: 'NEUTRAL',
      tags: JSON.stringify(['Excelente Desempenho']),
    }
  });

  // Create Observations
  await prisma.observation.create({
    data: {
      studentId: student1.id,
      intensity: 'high',
      frequency: 'frequent',
      context: 'Sala de aula - Matemática',
      description: 'Lucas tem levantado frequentemente da carteira e interrompido os colegas.',
      tags: JSON.stringify(['Inquietação', 'Desatenção'])
    }
  });

  await prisma.observation.create({
    data: {
      studentId: student2.id,
      intensity: 'low',
      frequency: 'sometimes',
      context: 'Recreio',
      description: 'Julia prefere ler sozinha do que brincar com os colegas, mas interage quando chamada.',
      tags: JSON.stringify(['Introvertida'])
    }
  });

  // Create Referrals
  await prisma.referral.create({
    data: {
      studentId: student1.id,
      teacherId: teacher.id,
      psychologistId: psychologist.id,
      status: 'UNDER_REVIEW',
      reason: 'Dificuldade crônica de concentração nas aulas afetando o rendimento acadêmico.',
      notes: 'Solicito avaliação com SNAP-IV.'
    }
  });

  // Create Assessment Template
  const snapIV = await prisma.assessmentTemplate.create({
    data: {
      name: 'SNAP-IV (TDAH)',
      slug: 'snap-iv',
      category: 'TDAH',
      description: 'Questionário de Avaliação de Transtorno de Déficit de Atenção e Hiperatividade',
      ageRange: '6-12',
    }
  });

  await prisma.assessmentQuestion.createMany({
    data: [
      { templateId: snapIV.id, question: 'Não consegue prestar muita atenção a detalhes ou comete erros por descuido', type: 'select', options: JSON.stringify(['Nem um pouco', 'Só um pouco', 'Bastante', 'Demais']), order: 1 },
      { templateId: snapIV.id, question: 'Tem dificuldade de manter a atenção em tarefas ou atividades de lazer', type: 'select', options: JSON.stringify(['Nem um pouco', 'Só um pouco', 'Bastante', 'Demais']), order: 2 },
      { templateId: snapIV.id, question: 'Parece não estar ouvindo quando se fala diretamente com ele', type: 'select', options: JSON.stringify(['Nem um pouco', 'Só um pouco', 'Bastante', 'Demais']), order: 3 },
    ]
  });

  console.log('✅ Seed completed! Database populated with realistic mock data.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
