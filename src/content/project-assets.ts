import type { ProjectAssets, ProjectScreenshot } from '../types/content'

const mushroomScreenshots: ProjectScreenshot[] = [
  {
    id: 'dashboard',
    src: '/projects/mushroom-o/mushroom-dashboard.jpg',
    width: 1265,
    height: 712,
    title: { en: 'Greenhouse conditions', th: 'ติดตามสภาพโรงเรือน' },
    alt: {
      en: 'Mushroom greenhouse dashboard displaying carbon dioxide, temperature, humidity, and the time of the latest readings.',
      th: 'หน้าสภาพโรงเรือนเห็ด แสดงค่าคาร์บอนไดออกไซด์ อุณหภูมิ ความชื้น และเวลาที่ได้รับข้อมูลล่าสุด',
    },
    caption: {
      en: 'Environmental readings appear alongside configured ranges, freshness indicators, and equipment status. Values in this screenshot reflect the capture time.',
      th: 'แสดงค่าที่วัดได้เทียบกับช่วงที่กำหนด พร้อมเวลาที่ได้รับข้อมูลและสถานะอุปกรณ์ ตัวเลขในภาพเป็นข้อมูลขณะบันทึกหน้าจอ',
    },
  },
  {
    id: 'automation',
    src: '/projects/mushroom-o/mushroom-automation.jpg',
    width: 1265,
    height: 712,
    title: { en: 'Automatic control explained', th: 'เข้าใจการทำงานอัตโนมัติ' },
    alt: {
      en: 'Greenhouse automation page explaining sensor readings, validation, and fan and misting control rules.',
      th: 'หน้าอธิบายการทำงานอัตโนมัติ เรียงขั้นตอนวัดค่า ตรวจข้อมูล และสั่งงาน พร้อมเกณฑ์ควบคุมพัดลมและเครื่องพ่นเพิ่มความชื้น',
    },
    caption: {
      en: 'The public page explains the controller’s measurement, validation, and actuation sequence, with separate start and stop conditions for each device.',
      th: 'อธิบายลำดับวัดค่า ตรวจค่าที่วัดได้ และสั่งอุปกรณ์ โดยแยกเงื่อนไขเปิดกับปิดของอุปกรณ์แต่ละชนิดให้ตรวจสอบได้',
    },
  },
]

const lifelongScreenshots: ProjectScreenshot[] = [
  {
    id: 'courses',
    src: '/projects/lifelong-learning/lifelong-courses.jpg',
    width: 1274,
    height: 717,
    title: { en: 'Find a course', th: 'ค้นหาหลักสูตรที่สนใจ' },
    alt: {
      en: 'SSKRU Lifelong course catalog with search, category and fee filters, sorting, and course cards.',
      th: 'หน้ารวมหลักสูตร SSKRU Lifelong มีช่องค้นหา ตัวกรองหมวดหมู่และค่าเรียน การเรียงลำดับ และการ์ดหลักสูตร',
    },
    caption: {
      en: 'Learners explore available courses using search, categories, fee filters, and sorting before opening a course’s details.',
      th: 'ผู้เรียนค้นหาหลักสูตร เลือกหมวดหมู่ กรองหลักสูตรฟรีหรือมีค่าเรียน และเรียงลำดับก่อนเปิดดูรายละเอียด',
    },
  },
  {
    id: 'course-detail',
    src: '/projects/lifelong-learning/lifelong-course-detail.jpg',
    width: 1274,
    height: 717,
    title: { en: 'Explore course details', th: 'ดูรายละเอียดก่อนสมัครเรียน' },
    alt: {
      en: 'An online course detail page showing the introduction, lesson and quiz counts, fee, course schedule, and account access for enrollment.',
      th: 'หน้ารายละเอียดหลักสูตรออนไลน์ แสดงคำอธิบาย จำนวนบทเรียนและแบบทดสอบ ค่าเรียน กำหนดการ และทางเข้าสู่ระบบเพื่อสมัครเรียน',
    },
    caption: {
      en: 'Course information, learning activities, fees, and dates are grouped before enrollment. Classroom access requires a learner account.',
      th: 'จัดข้อมูลหลักสูตร กิจกรรมการเรียน ค่าเรียน และช่วงเวลาไว้ก่อนสมัคร ส่วนการเข้าเรียนใช้บัญชีผู้เรียน',
    },
  },
]

const floodScreenshots: ProjectScreenshot[] = [
  {
    id: 'overview',
    src: '/projects/sisaket-flood/flood-overview.jpg',
    width: 1265,
    height: 712,
    title: {
      en: 'Water information near you',
      th: 'ติดตามสถานการณ์น้ำในพื้นที่',
    },
    alt: {
      en: 'Sisaket Prompt home page with a water-station selector, measurement timestamps, provincial trends, and links to maps and support information.',
      th: 'หน้าแรกศรีสะเกษพร้อม แสดงตัวเลือกสถานีวัดน้ำ เวลาตรวจวัด แนวโน้มระดับน้ำ และทางลัดสู่แผนที่กับข้อมูลช่วยเหลือ',
    },
    caption: {
      en: 'Visitors select a station and review water-level context and measurement times, with nearby links to maps, shelters, and assistance information.',
      th: 'ผู้ใช้เลือกสถานีเพื่อดูบริบทระดับน้ำและเวลาตรวจวัด พร้อมทางลัดไปยังแผนที่ ศูนย์พักพิง และข้อมูลขอความช่วยเหลือ',
    },
  },
  {
    id: 'map',
    src: '/projects/sisaket-flood/flood-map.jpg',
    width: 1265,
    height: 712,
    title: { en: 'Explore water map layers', th: 'สำรวจข้อมูลน้ำบนแผนที่' },
    alt: {
      en: 'Water-information map with station and reservoir markers, waterways, layer controls, and a legend.',
      th: 'แผนที่ข้อมูลน้ำ มีหมุดสถานีและอ่างเก็บน้ำ แนวลำน้ำ เครื่องมือเลือกชั้นข้อมูล และคำอธิบายสัญลักษณ์',
    },
    caption: {
      en: 'The map brings stations, reservoirs, waterways, and optional layers into one view. Layer availability and data status remain visible in the interface.',
      th: 'รวมสถานี อ่างเก็บน้ำ แนวลำน้ำ และชั้นข้อมูลที่เลือกเปิดดูได้ พร้อมแสดงสถานะและความพร้อมของข้อมูลในหน้าจอ',
    },
  },
]

const publicCaptureNote = {
  en: 'Captured from the public website on 26 October 2026. Screenshots show the data available at capture time.',
  th: 'บันทึกจากหน้าเว็บสาธารณะเมื่อ 26 ต.ค. 2569 ภาพแสดงข้อมูล ณ เวลาที่บันทึก',
}

// Shared by English and Thai. Omit external links until their URLs are confirmed.
export const projectAssets: Record<
  'bcg' | 'mushroom' | 'lifelong' | 'flood',
  ProjectAssets
> = {
  bcg: {
    demoUrl: undefined,
    sourceUrl: undefined,
    image: undefined,
    architectureImage: undefined,
  },
  mushroom: {
    demoUrl: 'https://mushroom.kitsakorn.com/',
    sourceUrl: undefined,
    image: mushroomScreenshots[0],
    screenshots: mushroomScreenshots,
    screenshotNote: publicCaptureNote,
  },
  lifelong: {
    demoUrl: 'https://lifelong.kitsakorn.com/',
    sourceUrl: undefined,
    image: lifelongScreenshots[0],
    screenshots: lifelongScreenshots,
    screenshotNote: {
      en: 'Captured from the public website on 26 October 2026. Some courses contain example content; the classroom is accessed after sign-in.',
      th: 'บันทึกจากหน้าเว็บสาธารณะเมื่อ 26 ต.ค. 2569 บางหลักสูตรมีเนื้อหาตัวอย่าง ส่วนห้องเรียนต้องเข้าสู่ระบบ',
    },
  },
  flood: {
    demoUrl: 'https://sisaket-prompt.next-th.com/',
    sourceUrl: undefined,
    image: floodScreenshots[0],
    screenshots: floodScreenshots,
    screenshotNote: publicCaptureNote,
  },
}

export const bcgScreenshots: ProjectScreenshot[] = [
  {
    id: 'home',
    src: '/projects/bcg/bcg-home.jpg',
    width: 1265,
    height: 712,
    title: { en: 'Discover the platform', th: 'รู้จักแพลตฟอร์ม' },
    alt: {
      en: 'Smart Old Town home page introducing low-carbon products, eco-friendly actions, and participating shops.',
      th: 'หน้าแรก Smart Old Town แนะนำสินค้าลดคาร์บอน พฤติกรรมรักษ์โลก และการค้นหาร้านค้าในเครือข่าย',
    },
    caption: {
      en: 'A public entry point that introduces low-carbon shopping and guides visitors toward participating shops and point collection.',
      th: 'หน้าแรกอธิบายการเลือกสินค้าลดคาร์บอนและพฤติกรรมรักษ์โลก พร้อมนำผู้ใช้ไปค้นหาร้านค้าและเรียนรู้วิธีสะสมแต้ม',
    },
  },
  {
    id: 'map',
    src: '/projects/bcg/bcg-map.jpg',
    width: 1265,
    height: 712,
    title: { en: 'Find participating shops', th: 'ค้นหาร้านค้าบนแผนที่' },
    alt: {
      en: 'BCG shop discovery page with province filters, a shop search, an interactive map, and a matching shop list.',
      th: 'หน้าค้นหาร้านค้า BCG มีตัวกรองจังหวัด ช่องค้นหาชื่อร้าน แผนที่หมุดร้านค้า และรายการร้านที่ตรงกับตัวกรอง',
    },
    caption: {
      en: 'Province and shop-name filters connect the map with a shop list, so visitors can explore the network without sharing their location.',
      th: 'ตัวกรองจังหวัดและชื่อร้านเชื่อมแผนที่กับรายการร้านค้า ผู้ใช้จึงสำรวจเครือข่ายได้แม้ไม่อนุญาตให้เข้าถึงตำแหน่ง',
    },
  },
  {
    id: 'first-time',
    src: '/projects/bcg/bcg-first-time.jpg',
    width: 1265,
    height: 904,
    title: { en: 'First-time account access', th: 'เริ่มใช้งานบัญชี' },
    alt: {
      en: 'First-time password setup screen with phone verification, a three-step progress indicator, and partner logos below the form.',
      th: 'หน้าตั้งรหัสผ่านครั้งแรก มีฟอร์มระบุเบอร์โทร ตัวบอกขั้นตอนยืนยัน OTP และกำหนดรหัสผ่าน พร้อมโลโก้ภาคีใต้ฟอร์ม',
    },
    caption: {
      en: 'Customers who previously collected points at a shop can begin phone verification and password setup through a clear three-step flow.',
      th: 'ลูกค้าที่เคยสะสมแต้มด้วยเบอร์โทรที่ร้าน เริ่มยืนยันเบอร์และตั้งรหัสผ่านได้ โดยหน้าจอแสดงลำดับการใช้งาน 3 ขั้นตอนอย่างชัดเจน',
    },
  },
]
