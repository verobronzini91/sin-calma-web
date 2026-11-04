import { external } from "./navigation";
import type { ImageAsset } from "./types";

/** Textos de /asesorias-para-novias, tal cual el brief aprobado. */

export const asesoriasMeta = {
  title: "Asesorías para novias que organizan su boda",
  description:
    "Organizás tu boda sola pero necesitás una mirada experta. Asesorías online personalizadas para ordenar decisiones, proveedores y presupuesto.",
};

/** Todos los “Contratar asesoría” abren el mail. */
const contratar = { label: "Contratar asesoría", href: "mailto:c.calmashoes@gmail.com" };

export const asHero = {
  title: ["Asesorías para novias", "que organizan su boda", "por su cuenta"],
  lead: "¿Estás organizando tu casamiento y necesitás una opinión clara sobre lo que estás haciendo?",
  text: [
    "Las asesorías son encuentros online y personalizados para ayudarte a revisar tu boda con una mirada experta.",
    "Traés tus dudas, proveedores, presupuestos, ideas o decisiones.",
  ],
  closing: "Nosotras miramos tu caso y te decimos qué vemos, qué ajustaríamos y cómo seguir.",
  cta: contratar,
  /* Foto original (4:3), sin editar. En desktop el foco baja hacia la mesa para que entren
     el florero completo y los papeles; en mobile el componente centra el florero. */
  image: {
    src: "/images/asesorias/hero.jpg",
    alt: "Flores secas y papeles sobre una mesa durante la planificación de un evento",
    position: "50% 76%",
    tone: "stone",
  } satisfies ImageAsset,
};

export const asRevisar = {
  title: "¿Qué podemos revisar?",
  items: [
    "proveedores",
    "presupuestos",
    "prioridades",
    "logística",
    "tiempos",
    "decisiones que ya tomaste",
    "cosas que quizás todavía no estás teniendo en cuenta",
  ],
  closing: ["No trabajamos sobre una boda genérica.", "Trabajamos sobre la tuya."],
};

export const asComoFunciona = {
  title: "¿Cómo funciona?",
  steps: [
    { title: "Nos contás tu situación", text: "En qué etapa estás y qué necesitás revisar." },
    { title: "Tenemos la asesoría", text: "Un encuentro online de aproximadamente 2 horas." },
    { title: "Te llevás una mirada clara", text: "Respuestas concretas, recomendaciones y próximos pasos." },
  ],
  cta: contratar,
};

const ebookUrl =
  "https://calmashoes.com/productos/guia-practica-para-las-futuras-novias-ebook-con-consejos-y-tips-para-tu-casamiento-10ckx/";

type FormaCta = { label: string; href: string; newTab?: boolean };

/** `fit: "contain"`: producto completo sobre fondo claro, sin recorte. */
type FormaImage = ImageAsset & { fit?: "contain" };

/** Sin foto: el dibujo a mano ocupa el lugar de la imagen. */
type FormaSketch = { sketch: "table" };

export const asFormas = {
  title: "Tres formas de acompañarte",
  items: [
    {
      title: "Ebook",
      text: {
        before: "Para vos si querés ",
        strong: "información sobre cómo organizar tu casamiento",
        after: " y entender mejor todo lo que implica el proceso.",
      },
      cta: { label: "Ver ebook", href: ebookUrl, newTab: true } as FormaCta,
      /* Imagen real de la ficha del producto en calmashoes.com, guardada en el proyecto */
      image: {
        src: "/images/asesorias/ebook.jpg",
        alt: "Portada del ebook Sin Calma no hay Boda: guía paso a paso para una novia moderna",
        fit: "contain",
        tone: "ivory",
        label: "Ebook",
      } as FormaImage | FormaSketch,
    },
    {
      title: "El Diario de la Novia",
      text: {
        before: "Para vos si necesitás ",
        strong: "una guía dinámica para ir organizando tu boda paso a paso",
        after: ", con todo el proceso ordenado en un solo lugar.",
      },
      cta: { label: "Conocer el Diario", href: external.diario } as FormaCta,
      /* Slot propio; mientras tanto, la imagen real del Diario que ya usa la Home */
      image: {
        src: ["/images/asesorias/diario.jpg", "/images/home/diario-novia.jpg"],
        alt: "Diario de la novia abierto sobre una mesa, con anillos y una birome",
        tone: "ivory",
        label: "El Diario de la Novia",
      } as FormaImage | FormaSketch,
    },
    {
      title: "Asesoría",
      text: {
        before: "Para vos si ya estás organizando tu boda y querés ",
        strong: "una opinión experta, clara y personalizada sobre tu casamiento",
        after: ".",
      },
      cta: contratar as FormaCta,
      image: { sketch: "table" } as FormaImage | FormaSketch,
    },
  ],
};

export const asFaq = {
  title: "Preguntas frecuentes",
  items: [
    { question: "¿Cuánto dura?", answer: "Aproximadamente 2 horas." },
    { question: "¿Es online?", answer: "Sí. Podés hacerla estés donde estés." },
    {
      question: "¿Tengo que tener todo organizado?",
      answer: "No. Podés venir en cualquier etapa del proceso.",
    },
    {
      question: "¿Necesito tener El Diario?",
      answer: "No. El Diario, el ebook y la asesoría son herramientas diferentes y pueden usarse por separado.",
    },
  ],
};

export const asCierre = {
  title: "¿Querés sumar nuestra mirada a tu boda?",
  cta: contratar,
};
