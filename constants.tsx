
import { Subject, Chapter } from './types';

export const REVISION_DATA: Record<Subject, Chapter[]> = {
  [Subject.PHYSICS]: [
    {
      id: 'p1',
      title: 'Mouvement et Forces',
      questions: [
        {
          id: 'p1q1',
          type: 'QCM',
          text: "Un projectile est lancé avec une vitesse V0 faisant un angle alpha avec l'horizontale. À l'apogée de sa trajectoire, que vaut sa vitesse ?",
          options: ["0", "V0", "V0 * cos(alpha)", "V0 * sin(alpha)"],
          correctAnswer: 2,
          explanation: "À l'apogée, la composante verticale Vy est nulle. Il ne reste que la composante horizontale Vx = V0 * cos(alpha), qui est constante en l'absence de frottements."
        },
        {
          id: 'p1q2',
          type: 'PROBLEM',
          text: "Équilibre d'un solide : Un solide de masse 5kg est maintenu sur un plan incliné de 30° par un ressort de raideur k=100 N/m. Calculez l'allongement x du ressort à l'équilibre (g=10m/s²).",
          explanation: "À l'équilibre : k*x = m*g*sin(30°). 100*x = 5*10*0.5 => 100*x = 25 => x = 0.25m soit 25cm. Point clé : Toujours projeter les forces sur l'axe du mouvement."
        }
      ]
    },
    {
      id: 'p2',
      title: 'Travail et Énergie',
      questions: [
        {
          id: 'p2q1',
          type: 'KEY_POINT',
          text: "Puissance d'une force",
          explanation: "P = F . V (produit scalaire). La puissance est le débit d'énergie. En 2nde C, retenez P = W/t. Unité : Watt (W)."
        }
      ]
    }
  ],
  [Subject.CHEMISTRY]: [
    {
      id: 'c1',
      title: 'Structure Atomique & Classification',
      questions: [
        {
          id: 'c1q1',
          type: 'PROBLEM',
          text: "L'ion X2+ possède 18 électrons. Quel est le numéro atomique Z de l'élément X ? À quelle période appartient-il ?",
          explanation: "L'atome neutre a perdu 2 électrons pour devenir X2+. Donc Z = 18 + 2 = 20 (Calcium). Sa structure est (K)2 (L)8 (M)8 (N)2. Il appartient à la 4ème période (4 couches occupées)."
        },
        {
          id: 'c1q2',
          type: 'KEY_POINT',
          text: "Règle de l'Octet et du Duet",
          explanation: "He (Z=2) suit le duet (2e-). Les autres gaz nobles suivent l'octet (8e-). C'est la quête de stabilité qui dicte les liaisons chimiques."
        }
      ]
    }
  ],
  [Subject.MATHS]: [
    {
      id: 'm1',
      title: 'Second Degré & Discriminant',
      questions: [
        {
          id: 'm1q1',
          type: 'PROBLEM',
          text: "Résoudre dans R : 3x² + 7x + 2 = 0. Calculez les racines.",
          explanation: "Delta = 7² - 4(3)(2) = 49 - 24 = 25. Delta > 0, deux racines : x1 = (-7-5)/6 = -2 et x2 = (-7+5)/6 = -1/3."
        }
      ]
    },
    {
      id: 'm2',
      title: 'Géométrie Vectorielle',
      questions: [
        {
          id: 'm2q1',
          type: 'KEY_POINT',
          text: "Relation de Chasles",
          explanation: "Vecteur AB + Vecteur BC = Vecteur AC. C'est l'outil fondamental pour simplifier toute somme vectorielle dans les exercices de 2nde C."
        }
      ]
    }
  ],
  [Subject.SVT]: [],
  [Subject.INFO]: [],
  [Subject.LIT]: [
    {
      id: 'l1',
      title: 'Dissertation Littéraire',
      questions: [
        {
          id: 'l1q1',
          type: 'KEY_POINT',
          text: "Thèmes Probables 2024",
          explanation: "1. La fonction sociale de l'écrivain. 2. La littérature entre engagement et esthétique. 3. Le conflit des générations dans le roman africain."
        }
      ]
    }
  ]
};
