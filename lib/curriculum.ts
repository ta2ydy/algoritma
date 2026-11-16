export type LearningMode = 'summary' | 'flashcards' | 'quiz' | 'tutor';

export interface SummarySection {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
}

export interface GoldenTip {
  id: string;
  title: string;
  tip: string;
}

export interface FlashcardItem {
  id: string;
  term: string;
  hint: string;
  definition: string;
  example: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  isAiGenerated?: boolean;
}

export interface CurriculumUnit {
  id: number;
  code: string;
  shortTitle: string;
  title: string;
  englishTopicSummary: string;
  description: string;
  learningOutcomes: string[];
  sections: SummarySection[];
  goldenTips: GoldenTip[];
  flashcards: FlashcardItem[];
  quiz: QuizQuestion[];
  tutorStarters: string[];
}

export const CURRICULUM_UNITS: CurriculumUnit[] = [
  {
    id: 1,
    code: '1. Ünite',
    shortTitle: 'Bilişim & Donanım',
    title: 'Bilişim Teknolojileri ve Donanım',
    englishTopicSummary:
      '5th-grade MEB Unit 1: Information Technologies in Daily Life, Hardware vs. Software, Input/Output/Processing/Storage Units, Operating Systems, and File & Folder Management (extensions like .docx, .jpg, .mp3, .pdf).',
    description:
      'Bilgisayarın fiziksel parçalarını, yazılımların çalışma mantığını ve dosyaları düzenli yönetme becerilerini keşfet.',
    learningOutcomes: [
      'Bilişim teknolojilerinin günlük yaşamdaki yerini ve önemini kavrar.',
      'Donanım ve yazılım kavramlarını örneklerle ayırt eder.',
      'Giriş, çıkış, işlem ve depolama birimlerini sınıflandırır.',
      'Dosya uzantılarını tanır ve klasör hiyerarşisi oluşturur.',
    ],
    sections: [
      {
        id: 'u1-s1',
        title: 'Donanım ve Yazılım Ayrımı',
        summary:
          'Bilgisayar sistemleri, gözle görebildiğimiz ve elimizle dokunabildiğimiz fiziksel parçalar ile bu parçalara ne yapacağını söyleyen programların uyum içinde çalışmasından oluşur.',
        keyPoints: [
          'Donanım (Hardware): Klavye, monitör, anakart ve işlemci gibi fiziksel olarak dokunabildiğimiz tüm parçalardır.',
          'Yazılım (Software): Donanımların görevini yerine getirmesini sağlayan komutlar ve programlar bütünüdür.',
          'Sistem Yazılımı (İşletim Sistemi): Bilgisayar ile kullanıcı arasındaki köprüdür (Windows, macOS, Linux, Pardus, Android).',
          'Uygulama Yazılımı: Belirli bir işi yapmak için kullanılan programlardır (kelime işlemci, tarayıcı, çizim programı).',
        ],
      },
      {
        id: 'u1-s2',
        title: 'Bilgisayarın Temel Birimleri',
        summary:
          'Veriler bilgisayara giriş birimleriyle aktarılır, işlem birimlerinde işlenir, bellekte tutulur ve çıkış birimleriyle kullanıcıya sunulur.',
        keyPoints: [
          'Giriş Birimleri: Bilgisayara veri gönderen parçalar — Klavye, Fare, Mikrofon, Tarayıcı, Web Kamerası.',
          'Çıkış Birimleri: İşlenen bilgiyi bize sunan parçalar — Monitör, Yazıcı, Hoparlör, Projeksiyon.',
          'İşlem ve Bellek: İşlemci (CPU) bilgisayarın beynidir. RAM geçici, ROM ise kalıcı başlangıç belleğidir.',
          'Depolama Birimleri: Verileri kalıcı saklar — SSD, Sabit Disk (HDD), USB Bellek, Hafıza Kartı.',
        ],
      },
      {
        id: 'u1-s3',
        title: 'Dosya, Klasör ve Uzantı Yönetimi',
        summary:
          'Dijital ortamda ürettiğimiz her bilgi dosyalar halinde saklanır. Dosyaları düzenlemek için klasörler kullanırız ve dosya türünü uzantısından anlarız.',
        keyPoints: [
          'Dosya Adı ve Uzantı: "odevim.docx" ifadesinde nokta öncesindeki kısım dosya adı, nokta sonrası ise uzantıdır.',
          'Metin ve Belge Uzantıları: .docx (Word), .txt (Düz Metin), .pdf (Taşınabilir Belge).',
          'Görsel ve Ses Uzantıları: .jpg / .png (Resim), .mp3 / .wav (Ses), .mp4 (Video).',
          'Klasör Hiyerarşisi: Konulara göre ana klasör ve alt klasörler oluşturmak aradığımız belgeyi saniyeler içinde bulmamızı sağlar.',
        ],
      },
    ],
    goldenTips: [
      {
        id: 'u1-tip1',
        title: 'RAM Geçicidir, Sık Kaydet!',
        tip: 'Üzerinde çalıştığın belge o anda geçici bellek olan RAM üzerinde tutulur. Elektrik kesilirse veya bilgisayar kapanırsa kaydedilmemiş veriler silinir. Bu yüzden Ctrl + S kısayoluyla sık sık kaydetmeyi alışkanlık haline getir.',
      },
      {
        id: 'u1-tip2',
        title: 'Dosya Uzantısına Dokunma',
        tip: 'Bir dosyanın adını değiştirirken sonundaki .jpg veya .docx gibi uzantıyı silmemelisin. Uzantı silinirse işletim sistemi o dosyayı hangi programla açacağını bilemez.',
      },
      {
        id: 'u1-tip3',
        title: 'Kapasite Birimlerini Sırala',
        tip: 'En küçük veri birimi Bit, 8 bit ise 1 Byte (Bayt) eder. Sıralama küçükten büyüğe şöyledir: Bit < Byte < Kilobyte (KB) < Megabyte (MB) < Gigabyte (GB) < Terabyte (TB).',
      },
    ],
    flashcards: [
      {
        id: 'u1-fc1',
        term: 'Donanım (Hardware)',
        hint: 'Bilgisayarın fiziksel yapısı',
        definition:
          'Bilgisayarı oluşturan, gözle görülebilen ve elle tutulabilen tüm mekanik ve elektronik parçalardır.',
        example: 'Klavye, fare, monitör, anakart, işlemci ve yazıcı birer donanımdır.',
      },
      {
        id: 'u1-fc2',
        term: 'İşlemci (CPU)',
        hint: 'Bilgisayarın beyni olarak bilinir',
        definition:
          'Bilgisayardaki tüm mantıksal ve matematiksel işlemleri yapan, donanımlar arasındaki veri akışını yöneten temel birimdir.',
        example: 'Bir hesap makinesinde toplama yaptığında veya oyunda karakteri hareket ettirdiğinde sonucu işlemci hesaplar.',
      },
      {
        id: 'u1-fc3',
        term: 'RAM Bellek',
        hint: 'Elektrik kesilince içindeki veriler silinir',
        definition:
          'Bilgisayar açıkken çalışan programların ve açık dosyaların geçici olarak tutulduğu hızlı çalışma belleğidir.',
        example: 'Ödevini yazarken henüz kaydetmediysen metin sadece RAM bellekte bekliyordur.',
      },
      {
        id: 'u1-fc4',
        term: 'İşletim Sistemi',
        hint: 'Kullanıcı ile donanım arasındaki köprü',
        definition:
          'Bilgisayarın tüm donanım kaynaklarını yöneten ve diğer uygulama yazılımlarının çalışması için temel ortamı sağlayan sistem yazılımıdır.',
        example: 'Pardus, Windows, macOS, Android ve iOS birer işletim sistemidir.',
      },
      {
        id: 'u1-fc5',
        term: 'Giriş ve Çıkış Birimleri',
        hint: 'Veri bilgisayara nasıl girer ve nasıl çıkar?',
        definition:
          'Giriş birimleri dış dünyadan bilgisayara veri aktarır; çıkış birimleri işlenen veriyi kullanıcıya gösterir veya duyurur.',
        example: 'Mikrofon ses aldığı için giriş birimi, hoparlör ses verdiği için çıkış birimidir.',
      },
      {
        id: 'u1-fc6',
        term: 'Dosya Uzantısı',
        hint: 'Dosya adının sonunda noktadan sonra yer alır',
        definition:
          'Dosyanın türünü (resim, ses, metin, video) ve hangi uygulama yazılımı ile açılacağını belirten 3 veya 4 harfli koddur.',
        example: 'tatil.jpg bir resim dosyasını, sunum.pptx ise bir sunum dosyasını ifade eder.',
      },
    ],
    quiz: [
      {
        id: 'u1-q1',
        question:
          'Aşağıdaki donanım birimlerinden hangisi hem veri girişi hem de veri çıkışı yapabilen bir birimdir?',
        options: ['Klavye', 'Dokunmatik Ekran', 'Hoparlör', 'Tarayıcı'],
        correctIndex: 1,
        explanation:
          'Dokunmatik ekran, parmağımızla komut verdiğimizde giriş birimi; görüntüyü bize gösterdiğinde çıkış birimi olarak görev yapar.',
      },
      {
        id: 'u1-q2',
        question:
          'Elektrik kesildiğinde veya bilgisayar kapatıldığında üzerindeki bilgileri kaybeden geçici bellek birimi hangisidir?',
        options: ['SSD Disk', 'ROM Bellek', 'RAM Bellek', 'USB Bellek'],
        correctIndex: 2,
        explanation:
          'RAM (Random Access Memory) geçici çalışma belleğidir; güç kesildiğinde içeriği tamamen sıfırlanır.',
      },
      {
        id: 'u1-q3',
        question:
          'Bir öğrencinin hazırladığı "fen_projesi.pdf" dosyasındaki ".pdf" kısmı neyi ifade eder?',
        options: [
          'Dosyanın oluşturulduğu yılı',
          'Dosyanın boyutunu',
          'Dosyanın türünü ve uzantısını',
          'Klasörün adını',
        ],
        correctIndex: 2,
        explanation:
          'Dosya adının sonunda noktadan sonra gelen bölüm dosya uzantısıdır ve dosyanın hangi türde olduğunu belirtir.',
      },
      {
        id: 'u1-q4',
        question:
          'Aşağıdakilerden hangisi bir sistem yazılımı (işletim sistemi) örneğidir?',
        options: ['Pardus', 'Hesap Makinesi', 'Google Chrome', 'Scratch'],
        correctIndex: 0,
        explanation:
          'Pardus, TÜBİTAK tarafından geliştirilen açık kaynaklı bir işletim sistemidir. Diğer seçenekler ise uygulama yazılımlarıdır.',
      },
      {
        id: 'u1-q5',
        question:
          'Veri depolama kapasitelerinin küçükten büyüğe doğru sıralanışı aşağıdakilerden hangisidir?',
        options: [
          'KB < MB < TB < GB',
          'Byte < KB < MB < GB',
          'MB < KB < GB < TB',
          'GB < MB < KB < Byte',
        ],
        correctIndex: 1,
        explanation:
          'Dijital veri ölçü birimleri küçükten büyüğe Bit, Byte, Kilobyte (KB), Megabyte (MB), Gigabyte (GB) ve Terabyte (TB) şeklinde sıralanır.',
      },
    ],
    tutorStarters: [
      'RAM ile Sabit Disk (SSD) arasındaki temel fark nedir?',
      'Giriş ve çıkış birimlerine günlük hayattan örnekler verir misin?',
      'Dosya uzantısı neden önemlidir ve yanlışlıkla değiştirirsek ne olur?',
    ],
  },
  {
    id: 2,
    code: '2. Ünite',
    shortTitle: 'Etik ve Güvenlik',
    title: 'Bilişim Etiği ve Dijital Güvenlik',
    englishTopicSummary:
      '5th-grade MEB Unit 2: Digital Citizenship, IT Ethics, Copyright & Creative Commons Licenses, Cyberbullying, Strong Passwords & Two-Factor Authentication, and Malware Protection.',
    description:
      'İnternet dünyasında saygılı, bilinçli ve güvende kalmanın kurallarını, telif haklarını ve parola güvenliğini öğren.',
    learningOutcomes: [
      'Bilişim etiği ilkelerini ve dijital vatandaşlık sorumluluklarını açıklar.',
      'Telif hakkı ve açık lisans (Creative Commons) kavramlarını bilir.',
      'Siber zorbalık karşısında nasıl davranması gerektiğini öğrenir.',
      'Güçlü parola oluşturur ve zararlı yazılımlara karşı önlem alır.',
    ],
    sections: [
      {
        id: 'u2-s1',
        title: 'Bilişim Etiği ve Telif Hakları',
        summary:
          'Gerçek hayatta olduğu gibi dijital ortamda da başkalarının haklarına saygı duymalı, ürettikleri içerikleri izinsiz kopyalamamalıyız.',
        keyPoints: [
          'Bilişim Etiği: İnternette dürüst davranmak, başkasının bilgilerine izinsiz erişmemek ve kibar bir dil kullanmaktır.',
          'Telif Hakkı: Bir kişinin ürettiği metin, resim, müzik veya yazılım üzerindeki yasal sahiplik hakkıdır.',
          'Creative Commons (CC): İçerik üreticisinin eserini hangi şartlarda (örneğin kaynak göstererek) paylaşabileceğimizi belirten esnek lisanslardır.',
          'Dijital Ayak İzi: İnternette yaptığımız paylaşımlar, yorumlar ve aramaların bıraktığı kalıcı izlerdir.',
        ],
      },
      {
        id: 'u2-s2',
        title: 'Siber Zorbalık ve Dijital Vatandaşlık',
        summary:
          'Dijital araçlar kullanarak bir kişiye kasıtlı ve tekrarlayıcı biçimde zarar vermeye veya onu üzmeye çalışmaya siber zorbalık denir.',
        keyPoints: [
          'Siber Zorbalık Örnekleri: Alaycı yorumlar yapmak, izinsiz fotoğraf paylaşmak, oyunlarda veya sohbetlerde dışlamak.',
          'Nasıl Başa Çıkılır?: Zorbalığa aynı şekilde karşılık verme, kanıt için ekran görüntüsü al, kullanıcıyı engelle ve mutlaka bir yetişkinden (anne, baba, öğretmen) yardım iste.',
          'Doğrulama Bilinci: İnternette okuduğumuz her bilgi doğru değildir; bilgiyi farklı güvenilir kaynaklardan teyit etmeliyiz.',
        ],
      },
      {
        id: 'u2-s3',
        title: 'Güçlü Parolalar ve Zararlı Yazılımlar',
        summary:
          'Kişisel hesaplarımızı korumak için tahmin edilmesi zor parolalar seçmeli ve cihazlarımıza sızmaya çalışan kötü amaçlı yazılımlara karşı dikkatli olmalıyız.',
        keyPoints: [
          'Güçlü Parola Kuralları: En az 8 karakter uzunluğunda; büyük harf, küçük harf, rakam ve özel karakter (!, ?, #, *) içermelidir.',
          'Kişisel Bilgi Yasağı: Adın, soyadın, doğum tarihin veya "123456" gibi ardışık sayılar parola olmamalıdır.',
          'Zararlı Yazılımlar: Virüs (kendini kopyalar), Truva Atı / Trojan (faydalı program gibi gizlenir), Fidye Yazılımı (dosyaları kilitler).',
          'Korunma: Antivirüs yazılımı kullanmak, güncellemeleri yapmak ve tanınmayan bağlantılara tıklamamak en etkili savunmadır.',
        ],
      },
    ],
    goldenTips: [
      {
        id: 'u2-tip1',
        title: 'Parola Cümlesi Yöntemi',
        tip: 'Hem akılda kalıcı hem de çok güçlü bir parola için sevdiğin bir cümlenin baş harflerini sembollerle birleştir! Örneğin "Her sabah 07:30da okula giderim!" ifadesinden "Hs07:30Og!" parolasını üretebilirsin.',
      },
      {
        id: 'u2-tip2',
        title: 'Kaynak Göstermeyi Unutma',
        tip: 'Ödevinde internetten aldığın bir görsel veya bilgiyi kullanırken sayfanın en altına mutlaka "Kaynakça" ekleyip aldığın adresi yazmalısın.',
      },
      {
        id: 'u2-tip3',
        title: 'Ücretsiz Hediye Tuzaklarına Dikkat',
        tip: '"Tebrikler, tablet kazandınız!" veya "Bedava oyun altını için tıkla!" gibi pencereler genellikle kimlik avı (phishing) tuzağıdır; hemen kapat.',
      },
    ],
    flashcards: [
      {
        id: 'u2-fc1',
        term: 'Bilişim Etiği',
        hint: 'Dijital dünyanın görgü ve ahlak kuralları',
        definition:
          'Bilgisayar ve internet kullanımında başkalarının haklarına, gizliliğine ve emeğine saygı göstermeyi sağlayan kurallar bütünüdür.',
        example: 'Arkadaşının şifresini bilse bile onun hesabına izinsiz girmemek bilişim etiğine uygun davranmaktır.',
      },
      {
        id: 'u2-fc2',
        term: 'Telif Hakkı',
        hint: 'Eser sahibinin yasal koruma hakkı',
        definition:
          'Bir kişinin kendi zekâsı ve emeğiyle oluşturduğu her türlü fikrî ve sanatsal ürün üzerindeki hukuki haklardır.',
        example: 'Bir fotoğrafçının çektiği resmi izinsiz kendi projemizde ticari amaçla kullanmamak telif hakkına saygıdır.',
      },
      {
        id: 'u2-fc3',
        term: 'Dijital Ayak İzi',
        hint: 'İnternette bıraktığımız görünmez izler',
        definition:
          'Çevrimiçi ortamda ziyaret ettiğimiz siteler, beğendiğimiz içerikler ve paylaştığımız yorumlar sonucunda oluşan veri geçmişidir.',
        example: 'Yıllar önce herkese açık yaptığın bir paylaşımın arama motorlarında hâlâ çıkması dijital ayak izidir.',
      },
      {
        id: 'u2-fc4',
        term: 'Siber Zorbalık',
        hint: 'Teknoloji aracılığıyla yapılan kasıtlı incitme',
        definition:
          'Dijital iletişim araçları üzerinden bir bireyi korkutma, küçük düşürme, tehdit etme veya dışlama amacıyla yapılan tekrarlayıcı davranışlardır.',
        example: 'Oyun sohbetinde bir arkadaşla sürekli alay etmek ve grubun dışına itmek siber zorbalıktır.',
      },
      {
        id: 'u2-fc5',
        term: 'Truva Atı (Trojan)',
        hint: 'Görünüşte masum ama arka planda zararlı',
        definition:
          'Kullanıcıya faydalı bir oyun veya uygulama gibi görünüp bilgisayara yüklendikten sonra gizlice zarar veren kötü amaçlı yazılımdır.',
        example: 'Güvenilir olmayan bir siteden indirilen sahte oyun yamasının gizlice şifreleri çalması.',
      },
      {
        id: 'u2-fc6',
        term: 'İki Aşamalı Doğrulama',
        hint: 'Paroladan sonra gelen ikinci güvenlik kilidi',
        definition:
          'Hesabına giriş yaparken parolana ek olarak telefonuna gelen tek kullanımlık kodu da girmeni isteyen güvenlik yöntemidir.',
        example: 'Birisi parolanı öğrense bile telefonuna gelen onay kodunu bilmediği için hesabına giremez.',
      },
    ],
    quiz: [
      {
        id: 'u2-q1',
        question:
          'Aşağıdaki parolalardan hangisi güvenlik kurallarına göre en güçlü olanıdır?',
        options: ['12345678', 'Ahmet2015', 'Mavi*Kedi#94', 'Bilisim5A'],
        correctIndex: 2,
        explanation:
          '"Mavi*Kedi#94" en az 8 karakterdir ve büyük harf, küçük harf, rakam ile özel karakterlerin (*, #) tamamını içerir.',
      },
      {
        id: 'u2-q2',
        question:
          'Sosyal medyada veya bir oyunda siber zorbalığa maruz kaldığında ilk olarak ne yapmalısın?',
        options: [
          'Zorbalık yapan kişiye aynı sertlikte cevap vermek',
          'Hesabını tamamen silip kimseye söylememek',
          'Kanıt için ekran görüntüsü alıp durumu ailenle veya öğretmeninle paylaşmak',
          'Bilgisayarı bir daha hiç açmamak',
        ],
        correctIndex: 2,
        explanation:
          'Siber zorbalığa karşı tartışmaya girmeden kanıt (ekran görüntüsü) almak, kişiyi engellemek ve güvendiğin bir yetişkinden destek istemek en doğru adımdır.',
      },
      {
        id: 'u2-q3',
        question:
          'Ödev hazırlarken internetten bulduğu bir makaleyi olduğu gibi kopyalayıp kendi yazmış gibi teslim eden öğrenci neyi ihlal etmiş olur?',
        options: [
          'Donanım kurallarını',
          'Telif hakkını ve bilişim etiğini',
          'Ağ bağlantısı hızını',
          'Ekran çözünürlüğünü',
        ],
        correctIndex: 1,
        explanation:
          'Başkasının ürettiği bir eseri izin almadan ve kaynak göstermeden kendi eseri gibi sunmak hem telif hakkı hem de bilişim etiği ihlalidir.',
      },
      {
        id: 'u2-q4',
        question:
          'Kendini masum ve yararlı bir program gibi gizleyip bilgisayara sızan zararlı yazılım türü hangisidir?',
        options: [
          'Antivirüs',
          'Truva Atı (Trojan)',
          'İşletim Sistemi',
          'Kelime İşlemci',
        ],
        correctIndex: 1,
        explanation:
          'Truva Atı, adını tarihteki Truva Atı hikâyesinden alır; dışarıdan zararsız bir dosya gibi görünse de arka planda sisteme zarar verir.',
      },
      {
        id: 'u2-q5',
        question:
          'İnternette yaptığımız paylaşımların, yorumların ve arama geçmişimizin bıraktığı kalıcı izlere ne ad verilir?',
        options: [
          'Dijital Ayak İzi',
          'Bulut Yedekleme',
          'Donanım Kimliği',
          'Sayfa Düzeni',
        ],
        correctIndex: 0,
        explanation:
          'Çevrimiçi ortamda gerçekleştirdiğimiz her etkileşim bizim hakkımızda dijital bir iz bırakır; buna Dijital Ayak İzi denir.',
      },
    ],
    tutorStarters: [
      'Güçlü ve akılda kalıcı bir parola nasıl oluşturabilirim?',
      'Creative Commons lisansı tam olarak ne işe yarar?',
      'Dijital ayak izimizi nasıl temiz ve güvenli tutabiliriz?',
    ],
  },
  {
    id: 3,
    code: '3. Ünite',
    shortTitle: 'İletişim & İnternet',
    title: 'İletişim, Ağlar ve İnternet',
    englishTopicSummary:
      '5th-grade MEB Unit 3: Computer Networks (LAN/WAN), Web Browsers & Search Engines, Effective Search Operators, Domain Extensions (.edu, .gov, .org, .com), Email Etiquette (CC/BCC & Netiquette), and Cloud Storage.',
    description:
      'Bilgisayar ağlarının nasıl kurulduğunu, internette doğru bilgiye nasıl ulaşacağını ve dijital iletişim kurallarını öğren.',
    learningOutcomes: [
      'Yerel alan ağı (LAN) ve geniş alan ağı (WAN) kavramlarını ayırt eder.',
      'Web adreslerindeki alan adı uzantılarını yorumlar.',
      'Arama motorlarında etkili arama teknikleri uygular.',
      'E-posta araçlarını (Kime, CC, BCC) ve internet görgü kurallarını kullanır.',
    ],
    sections: [
      {
        id: 'u3-s1',
        title: 'Bilgisayar Ağları ve İnternet',
        summary:
          'Bilgisayarların birbirleriyle veri ve donanım paylaşımı yapabilmek için kablolu veya kablosuz olarak bağlanmasıyla bilgisayar ağları oluşur.',
        keyPoints: [
          'LAN (Yerel Alan Ağı): Ev, okul laboratuvarı veya tek bir bina içindeki bilgisayarları birbirine bağlayan ağdır.',
          'WAN (Geniş Alan Ağı): Şehirleri, ülkeleri ve kıtaları birbirine bağlayan büyük ağlardır; İnternet dünyadaki en büyük WAN örneğidir.',
          'Modem ve Yönlendirici (Router): İnternet sinyalini evimize getiren ve cihazlar arasında dağıtan ağ donanımlarıdır.',
        ],
      },
      {
        id: 'u3-s2',
        title: 'Alan Adları ve Güvenli Arama Teknikleri',
        summary:
          'Her web sitesinin bir adresi (URL) ve bu adresin sonunda sitenin amacını gösteren bir uzantısı vardır.',
        keyPoints: [
          'Alan Adı Uzantıları: .gov (Devlet kurumları), .edu (Eğitim/Üniversite), .org (Sivil toplum/Dernek), .com (Ticari siteler), .k12 (İlk ve ortaöğretim okulları).',
          'Ülke Kodları: .tr (Türkiye), .uk (Birleşik Krallık), .de (Almanya) gibi kısaltmalar sitenin bağlı olduğu ülkeyi gösterir.',
          'Arama İpuçları: Tam eşleşme için tırnak işareti ("..."), istenmeyen kelimeyi çıkarmak için eksi (-), belirli bir sitede aramak için site: operatörü kullanılır.',
        ],
      },
      {
        id: 'u3-s3',
        title: 'E-Posta Kullanımı, Netiket ve Bulut',
        summary:
          'E-posta resmi ve hızlı dijital haberleşme aracıdır. Dosyalarımızı internet üzerindeki sunucularda saklamak içinse bulut depolama kullanırız.',
        keyPoints: [
          'Alıcı Alanları: Kime (To) ana alıcıyı, Bilgi (CC) bilgilendirilecek kişileri, Gizli (BCC) ise diğer alıcıların görmesini istemediğimiz kişileri eklemek içindir.',
          'Netiket (İnternet Görgü Kuralları): TAMAMEN BÜYÜK HARFLE yazmak bağırmak anlamına gelir; mesajlara kısa bir konu başlığı ve selamlama ile başlamalıyız.',
          'Bulut Depolama: Dosyaları kendi bilgisayarımız yerine internetteki güvenli sunucularda saklayıp her yerden erişmemizi sağlar.',
        ],
      },
    ],
    goldenTips: [
      {
        id: 'u3-tip1',
        title: 'Bilgiyi .gov ve .edu ile Doğrula',
        tip: 'Ödev veya araştırma yaparken sonu .gov.tr veya .edu.tr ile biten resmi kaynakları tercih et. Ayrıca adres çubuğunda kilit simgesi (HTTPS) olup olmadığını mutlaka kontrol et.',
      },
      {
        id: 'u3-tip2',
        title: 'Arama Operatörlerini Kullan',
        tip: 'Sadece kediler hakkında araştırma yaparken oyun sonuçları çıkıyorsa arama çubuğuna "kediler -oyun" yazarak oyun içeren sayfaları sonuçlardan eleyebilirsin.',
      },
      {
        id: 'u3-tip3',
        title: 'Toplu Mailde BCC Kuralı',
        tip: 'Bir gruba toplu e-posta gönderirken herkesin e-posta adresinin başkaları tarafından görülmemesi için adresleri Gizli (BCC) alanına yazmak gizlilik açısından en doğrusudur.',
      },
    ],
    flashcards: [
      {
        id: 'u3-fc1',
        term: 'LAN (Yerel Alan Ağı)',
        hint: 'Okul veya ev içi ağ',
        definition:
          'Birbirine yakın mesafedeki (aynı oda, ev veya okul binası içindeki) bilgisayar ve yazıcıların oluşturduğu küçük ölçekli ağdır.',
        example: 'Bilişim sınıfındaki 20 bilgisayarın tek bir yazıcıyı paylaşması LAN ağı sayesinde olur.',
      },
      {
        id: 'u3-fc2',
        term: 'WAN (Geniş Alan Ağı)',
        hint: 'Şehirleri ve ülkeleri aşan ağ',
        definition:
          'Coğrafi olarak birbirinden uzak bilgisayarları ve yerel ağları birbirine bağlayan geniş kapsamlı iletişim ağıdır.',
        example: 'Dünya genelindeki milyonlarca ağı birbirine bağlayan İnternet, en büyük WAN örneğidir.',
      },
      {
        id: 'u3-fc3',
        term: 'Alan Adı Uzantısı (.edu / .gov)',
        hint: 'Web sitesinin türünü belli eder',
        definition:
          'Bir web adresinin sonunda yer alan ve o sitenin hangi kurum türüne veya ülkeye ait olduğunu gösteren kısaltmadır.',
        example: 'meb.gov.tr devlet eğitim kurumunu, itu.edu.tr ise bir üniversiteyi ifade eder.',
      },
      {
        id: 'u3-fc4',
        term: 'CC ve BCC Alanları',
        hint: 'E-postada alıcı ekleme seçenekleri',
        definition:
          'CC (Bilgi) eklenen alıcıların herkesçe görünmesini sağlarken, BCC (Gizli) eklenen alıcıların adreslerini diğer alıcılardan gizler.',
        example: 'Öğretmenin tüm velilere aynı anda e-posta atarken veli adreslerini gizlemek için BCC kullanır.',
      },
      {
        id: 'u3-fc5',
        term: 'Netiket (Netiquette)',
        hint: 'İnternet dünyasının nezaket kuralları',
        definition:
          'E-posta, sohbet veya forumlarda saygılı, açık ve anlaşılır iletişim kurmak için uyulan çevrimiçi görgü kurallarıdır.',
        example: 'Mesajlarda tamamı büyük harf kullanmamak ve nazik bir selamlama yazmak netikete uygundur.',
      },
      {
        id: 'u3-fc6',
        term: 'Bulut Depolama',
        hint: 'Dosyalarına her cihazdan ulaşabilme kolaylığı',
        definition:
          'Dosyalarımızı yalnızca fiziksel diskte değil, internet üzerinden erişilen uzak sunucularda güvenli biçimde saklama yöntemidir.',
        example: 'Evde hazırladığın sunumu buluta yükleyip okul bilgisayarından doğrudan açabilirsin.',
      },
    ],
    quiz: [
      {
        id: 'u3-q1',
        question:
          'Bir okulun bilişim teknolojileri sınıfındaki bilgisayarların kendi aralarında birbirine bağlanması hangi ağ türüne örnektir?',
        options: [
          'WAN (Geniş Alan Ağı)',
          'LAN (Yerel Alan Ağı)',
          'Bulut Ağı',
          'Küresel Uydu Ağı',
        ],
        correctIndex: 1,
        explanation:
          'Aynı bina veya sınıf gibi dar bir alandaki cihazların bağlantısına LAN (Yerel Alan Ağı) adı verilir.',
      },
      {
        id: 'u3-q2',
        question:
          'Türkiye’deki bir devlet kurumunun resmi web sitesinin uzantısı aşağıdakilerden hangisi olur?',
        options: ['.com.tr', '.org.tr', '.gov.tr', '.net.tr'],
        correctIndex: 2,
        explanation:
          '".gov" (government) devlet kurumlarını, ".tr" ise Türkiye ülke kodunu temsil eder.',
      },
      {
        id: 'u3-q3',
        question:
          'Bir arama motorunda kelimelerin tam olarak yazdığımız sırayla geçtiği sayfaları bulmak için hangi işareti kullanırız?',
        options: [
          'Yıldız (*)',
          'Tırnak İşareti ("...")',
          'Soru İşareti (?)',
          'Artı (+)',
        ],
        correctIndex: 1,
        explanation:
          'İfadeyi tırnak işareti ("...") içine almak, arama motoruna kelimeleri tam o sırayla ve kalıp halinde aramasını söyler.',
      },
      {
        id: 'u3-q4',
        question:
          'E-posta gönderirken diğer alıcıların kime gönderildiğini görmesini istemediğimiz kişileri hangi alana yazarız?',
        options: ['Kime (To)', 'Konu (Subject)', 'Bilgi (CC)', 'Gizli (BCC)'],
        correctIndex: 3,
        explanation:
          'BCC (Blind Carbon Copy / Gizli) alanına yazılan e-posta adresleri, mesajı alan diğer kişiler tarafından görülmez.',
      },
      {
        id: 'u3-q5',
        question:
          'İnternet görgü kurallarına (Netiket) göre bir mesajın tamamını BÜYÜK HARFLERLE yazmak ne anlama gelir?',
        options: [
          'Mesajın çok komik olduğu',
          'Karşı tarafa bağırmak veya öfkeli olmak',
          'Bilgisayarın bozuk olduğu',
          'Resmi bir teşekkür edildiği',
        ],
        correctIndex: 1,
        explanation:
          'Dijital iletişimde tüm metni büyük harfle yazmak bağırmak anlamına gelir ve nezaket kurallarına aykırıdır.',
      },
    ],
    tutorStarters: [
      'LAN ve WAN ağları arasındaki farkı okul örneğiyle anlatır mısın?',
      'Arama motorunda en doğru sonucu bulmak için hangi işaretleri kullanmalıyım?',
      'E-postada CC ve BCC arasındaki fark nedir?',
    ],
  },
  {
    id: 4,
    code: '4. Ünite',
    shortTitle: 'Ürün Oluşturma',
    title: 'Dijital Ürün Oluşturma ve Tasarım',
    englishTopicSummary:
      '5th-grade MEB Unit 4: Word Processing & Document Formatting, Presentation Design Principles (6x6 rule, visual balance), Spreadsheets & Data Charts (bar, pie, line), and Multimedia/Visual Editing Tools.',
    description:
      'Kelime işlemciler, etkili sunumlar, veri tabloları ve grafiklerle fikirlerini etkileyici dijital ürünlere dönüştür.',
    learningOutcomes: [
      'Kelime işlemci programlarında metin ve sayfa düzeni araçlarını kullanır.',
      'Etkili sunum hazırlama ilkelerini uygular.',
      'Elektronik tablolarda veri düzenler ve uygun grafik türünü seçer.',
      'Görsel ve çoklu ortam araçlarıyla özgün içerik üretir.',
    ],
    sections: [
      {
        id: 'u4-s1',
        title: 'Kelime İşlemciler ve Belge Düzeni',
        summary:
          'Kelime işlemci programları ile dilekçe, rapor, hikâye veya afiş gibi yazılı belgeleri profesyonel bir görünüme kavuşturabiliriz.',
        keyPoints: [
          'Yazı Tipi ve Boyutu: Gövde metinlerinde okunaklı yazı tipleri ve 11–12 punto boyut kullanmak göz yormaz.',
          'Hizalama Seçenekleri: Sola hizala, ortala (başlıklar için), sağa hizala ve iki yana yasla.',
          'Sayfa Yapısı: Kenar boşlukları, dikey/yatay sayfa yönlendirmesi ve madde işaretleri belgenin düzenini güçlendirir.',
          'Temel Kısayollar: Ctrl+C (Kopyala), Ctrl+V (Yapıştır), Ctrl+X (Kes), Ctrl+Z (Geri Al), Ctrl+B (Kalın).',
        ],
      },
      {
        id: 'u4-s2',
        title: 'Etkili Sunum Hazırlama Teknikleri',
        summary:
          'İyi bir sunum, dinleyicinin dikkatini dağıtmadan ana fikri sade görseller ve kısa maddelerle aktarmalıdır.',
        keyPoints: [
          '6x6 Kuralı: Bir slaytta en fazla 6 satır, her satırda ise en fazla 6 kelime bulunmasına özen gösterilmelidir.',
          'Kontrast ve Okunabilirlik: Açık renk zemin üzerine koyu yazı veya koyu zemin üzerine açık yazı seçilmelidir.',
          'Görsel Dengesi: Uzun paragraflar yerine anahtar kelimeler ve konuyu destekleyen net görseller kullanılmalıdır.',
          'Animasyon Ölçüsü: Aşırı dönen veya uçan animasyonlar dinleyicinin dikkatini dağıtır; sade geçişler tercih edilmelidir.',
        ],
      },
      {
        id: 'u4-s3',
        title: 'Elektronik Tablolama ve Grafikler',
        summary:
          'Sayısal verileri satır ve sütunlardan oluşan hücrelerde düzenleyebilir, formüllerle hesaplama yapabilir ve grafiklere dönüştürebiliriz.',
        keyPoints: [
          'Hücre Adresi: Sütun harfi ve satır numarasının birleşimiyle oluşur (örneğin B3 hücresi).',
          'Temel Formüller: Elektronik tablolarda her formül eşittir (=) işareti ile başlar (=TOPLA(A1:A5) gibi).',
          'Doğru Grafik Seçimi: Sütun grafiği miktarları karşılaştırmak, pasta grafiği bütün içindeki yüzdeleri göstermek, çizgi grafiği ise zaman içindeki değişimi izlemek için kullanılır.',
        ],
      },
    ],
    goldenTips: [
      {
        id: 'u4-tip1',
        title: 'Slaytlarına "6x6 Kuralı" Uygula',
        tip: 'Sunum hazırlarken slaytı kitap sayfası gibi metinle doldurma! Dinleyici slaytı okumak yerine seni dinlemeli. En fazla 6 satır, her satırda en fazla 6 kelime kuralını unutma.',
      },
      {
        id: 'u4-tip2',
        title: 'Ctrl + Z Kurtarıcındır',
        tip: 'Belge veya görsel düzenlerken yanlışlıkla bir yeri silersen panik yapma; Ctrl + Z tuşlarına basarak son yaptığın işlemi anında geri alabilirsin.',
      },
      {
        id: 'u4-tip3',
        title: 'Formüle Eşittir (=) ile Başla',
        tip: 'Elektronik tablo programlarında A1 ve A2 hücrelerini toplamak için hücreye "A1+A2" yazarsan sadece metin görünür; hesaplama yapması için başına mutlaka "=" koyup "=A1+A2" yazmalısın.',
      },
    ],
    flashcards: [
      {
        id: 'u4-fc1',
        term: 'Kelime İşlemci',
        hint: 'Yazılı belgeler oluşturma aracı',
        definition:
          'Metin yazma, biçimlendirme, resim veya tablo ekleme ve belgeyi yazdırmaya hazırlama imkânı sunan yazılımlardır.',
        example: 'Okul gazetesi veya kitap özeti hazırlamak için LibreOffice Writer ya da Microsoft Word kullanabiliriz.',
      },
      {
        id: 'u4-fc2',
        term: '6x6 Sunum Kuralı',
        hint: 'Slaytlarda metin yoğunluğunu önler',
        definition:
          'Bir sunum slaytının kolay okunabilmesi için en fazla 6 madde ve her maddede en fazla 6 kelime kullanılmasını öneren tasarım ilkesidir.',
        example: 'Güneş Sistemi sunumunda gezegenleri uzun paragraflar yerine 3–4 kelimelik kısa maddelerle özetlemek.',
      },
      {
        id: 'u4-fc3',
        term: 'Hücre (Cell)',
        hint: 'Satır ve sütunun kesişim kutusu',
        definition:
          'Elektronik tablo programlarında sütunlar (harf) ile satırların (sayı) kesiştiği her bir veri kutucuğudur.',
        example: 'C sütunu ile 4. satırın kesiştiği kutunun adresi C4 olarak adlandırılır.',
      },
      {
        id: 'u4-fc4',
        term: 'Pasta Grafiği',
        hint: 'Bütün içindeki dilimleri gösterir',
        definition:
          'Bir bütünün parçalarının yüzdesel veya oransal dağılımını daire dilimleri halinde gösteren grafik türüdür.',
        example: 'Sınıftaki öğrencilerin sevdiği spor dallarının yüzde dağılımını göstermek için idealdir.',
      },
      {
        id: 'u4-fc5',
        term: 'Çizgi ve Sütun Grafiği',
        hint: 'Değişimi ve karşılaştırmayı görselleştirir',
        definition:
          'Sütun grafiği farklı kategorileri karşılaştırır; çizgi grafiği ise belirli bir zaman aralığındaki artış ve azalışları takip eder.',
        example: 'Bir haftalık hava sıcaklığının günlere göre değişimini çizgi grafiği ile çok net görebiliriz.',
      },
      {
        id: 'u4-fc6',
        term: 'Çoklu Ortam (Multimedya)',
        hint: 'Birden fazla medya türünün birleşimi',
        definition:
          'Metin, fotoğraf, ses, animasyon ve video öğelerinin tek bir dijital içerik içinde bir araya getirilmesidir.',
        example: 'İçinde hem yazı hem sesli anlatım hem de kısa video bulunan etkileşimli bir tanıtım sunumu.',
      },
    ],
    quiz: [
      {
        id: 'u4-q1',
        question:
          'Bir sunum hazırlarken slaytların çok kalabalık görünmemesi için uygulanan "6x6 Kuralı" neyi ifade eder?',
        options: [
          'Her slaytta en fazla 6 resim ve 6 video olması',
          'Her slaytta en fazla 6 satır ve her satırda en fazla 6 kelime olması',
          'Sunumun toplam 6 dakika sürmesi',
          'Yazı boyutunun 6 punto seçilmesi',
        ],
        correctIndex: 1,
        explanation:
          '6x6 kuralı, slaytlarda metin yığınını önlemek için en fazla 6 satır ve satır başına en fazla 6 kelime kullanılmasını önerir.',
      },
      {
        id: 'u4-q2',
        question:
          'Elektronik tablo programlarında C sütunu ile 5. satırın kesiştiği hücrenin adı nedir?',
        options: ['5C', 'C-5', 'C5', 'SC5'],
        correctIndex: 2,
        explanation:
          'Hücre adları her zaman önce sütun harfi, ardından satır numarası yazılarak ifade edilir (C5).',
      },
      {
        id: 'u4-q3',
        question:
          'Bir öğrencinin 5 gün boyunca çözdüğü soru sayısının günlere göre artış ve azalış eğilimini göstermek için en uygun grafik hangisidir?',
        options: [
          'Pasta Grafiği',
          'Çizgi Grafiği',
          'Kelime Bulutu',
          'Tablo Kenarlığı',
        ],
        correctIndex: 1,
        explanation:
          'Zaman içindeki değişimleri, yükseliş ve düşüş eğilimlerini göstermek için en uygun grafik türü Çizgi Grafiğidir.',
      },
      {
        id: 'u4-q4',
        question:
          'Kelime işlemci programında yanlışlıkla sildiğimiz bir paragrafı geri getirmek için hangi klavye kısayolunu kullanırız?',
        options: ['Ctrl + C', 'Ctrl + X', 'Ctrl + Z', 'Ctrl + B'],
        correctIndex: 2,
        explanation:
          'Ctrl + Z kısayolu "Geri Al" (Undo) komutunu çalıştırır ve son yapılan işlemi geri döndürür.',
      },
      {
        id: 'u4-q5',
        question:
          'Elektronik tablo programında bir hücreye formül yazmaya başlarken ilk olarak hangi işaret konulmalıdır?',
        options: ['Artı (+)', 'Eşittir (=)', 'Yüzde (%)', 'İki nokta (:)'],
        correctIndex: 1,
        explanation:
          'Elektronik tablolama yazılımları bir ifadenin hesaplama formülü olduğunu başındaki eşittir (=) işaretinden anlar.',
      },
    ],
    tutorStarters: [
      'Sunum hazırlarken renk ve yazı boyutu seçerken nelere dikkat etmeliyim?',
      'Sütun grafiği ile pasta grafiği ne zaman tercih edilir?',
      'Kelime işlemcide en çok işime yarayacak klavye kısayolları nelerdir?',
    ],
  },
  {
    id: 5,
    code: '5. Ünite',
    shortTitle: 'Algoritma & Kodlama',
    title: 'Problem Çözme, Algoritma ve Kodlama',
    englishTopicSummary:
      '5th-grade MEB Unit 5: Problem Solving Steps, Algorithms in Daily Life, Flowcharts and Symbols (Oval/Start-End, Parallelogram/Input-Output, Rectangle/Process, Diamond/Decision), Constants vs Variables, Conditionals (If-Else), Loops, and Block-Based Coding.',
    description:
      'Bir problemi adım adım çözmeyi, akış şeması çizmeyi, değişken, koşul ve döngü mantığıyla kodlamanın temellerini öğren.',
    learningOutcomes: [
      'Bir problemi analiz ederek çözüm için adım adım algoritma yazar.',
      'Akış şeması sembollerini doğru görevlerle eşleştirir.',
      'Sabit ve değişken kavramlarını programlama içinde kullanır.',
      'Karar yapıları (Eğer-Değilse) ve döngülerle blok tabanlı kod oluşturur.',
    ],
    sections: [
      {
        id: 'u5-s1',
        title: 'Algoritma Mantığı ve Problem Çözme',
        summary:
          'Algoritma, bir problemi çözmek veya belirli bir amaca ulaşmak için izlenen açık, mantıklı ve sıralı adımlar listesidir.',
        keyPoints: [
          'Başlangıç ve Bitiş: Her algoritma mutlaka "Başla" adımıyla başlar ve sonlu bir adımda "Bitir" ile tamamlanır.',
          'Kesinlik ve Sıra: Adımlar net olmalı ve doğru sırayla yazılmalıdır (örneğin çay demlerken önce su ısıtılır).',
          'Problem Çözme Süreci: Problemi anla → Plan yap (Algoritma kur) → Planı uygula (Kodla) → Test et ve hataları düzelt (Hata Ayıklama / Debug).',
        ],
      },
      {
        id: 'u5-s2',
        title: 'Akış Şeması (Flowchart) Sembolleri',
        summary:
          'Yazdığımız algoritmayı herkesin kolayca okuyabilmesi için standart geometrik şekillerle görselleştirdiğimiz diyagramlara akış şeması denir.',
        keyPoints: [
          'Elips (Oval): Algoritmanın "Başla" ve "Bitir" noktalarını gösterir.',
          'Paralelkenar: Kullanıcıdan veri alma (Giriş) veya ekrana sonuç yazma (Çıkış) işlemleri için kullanılır.',
          'Dikdörtgen: Matematiksel hesaplama, atama veya bir eylemi gerçekleştirme (İşlem) adımlarını gösterir.',
          'Baklava Dilimi (Eşkenar Dörtgen): Evet/Hayır veya Doğru/Yanlış şeklinde dallanan Karar (Koşul) sorularını gösterir.',
        ],
      },
      {
        id: 'u5-s3',
        title: 'Değişkenler, Koşullar ve Döngüler',
        summary:
          'Blok tabanlı kodlama araçlarında (Scratch, mBlock vb.) programlarımızı akıllı hale getiren üç temel yapı vardır.',
        keyPoints: [
          'Değişken ve Sabit: Program çalışırken değeri değişebilen veri kutularına Değişken (örneğin Skor, Can), hiç değişmeyen değerlere Sabit (örneğin Pi sayısı) denir.',
          'Koşul (Eğer - Değilse): Belirli bir şart sağlanıyorsa bir işlemi, sağlanmıyorsa başka bir işlemi çalıştırır (Eğer puan >= 50 ise "Geçti", değilse "Tekrar Dene").',
          'Döngü (Tekrarla): Aynı komut bloğunu defalarca alt alta yazmak yerine belirlenen sayıda veya koşul sağlanana kadar tekrar ettirir.',
        ],
      },
    ],
    goldenTips: [
      {
        id: 'u5-tip1',
        title: 'Döngü ile Kodu Kısalt',
        tip: 'Bir karakterin kare çizmesi için 4 kez "100 adım git + 90 derece dön" yazmak yerine, "4 defa tekrarla" döngüsü içine bu iki bloğu koyarak hem zamandan kazanır hem hatayı azaltırsın.',
      },
      {
        id: 'u5-tip2',
        title: 'Baklava Diliminden İki Ok Çıkar',
        tip: 'Akış şeması çizerken karar verme (baklava dilimi) kutusundan her zaman iki yol çıkar: biri şart doğruysa (Evet), diğeri şart yanlışsa (Hayır) gidilecek yönü gösterir.',
      },
      {
        id: 'u5-tip3',
        title: 'Hata Ayıklama (Debugging) Normaldir',
        tip: 'Kodun ilk denemede beklediğin gibi çalışmazsa üzülme! Programcılar zamanlarının büyük kısmını hatayı adım adım izleyip düzelterek geçirir.',
      },
    ],
    flashcards: [
      {
        id: 'u5-fc1',
        term: 'Algoritma',
        hint: 'Adım adım çözüm yolu',
        definition:
          'Bir problemi çözmek için izlenmesi gereken başlangıcı ve sonu belli, sıralı ve anlaşılır işlem adımlarıdır.',
        example: 'Sabah okula hazırlanma veya iki sayının ortalamasını hesaplama adımlarını sırayla yazmak.',
      },
      {
        id: 'u5-fc2',
        term: 'Akış Şeması Sembolleri',
        hint: 'Elips, Paralelkenar, Dikdörtgen, Baklava',
        definition:
          'Algoritmadaki adımların türünü görsel şekillerle ve yön oklarıyla gösteren standart şema dilidir.',
        example: 'Başla/Bitir için Elips, hesaplama için Dikdörtgen, karar sorusu için Baklava dilimi kullanılır.',
      },
      {
        id: 'u5-fc3',
        term: 'Değişken (Variable)',
        hint: 'İçindeki değer oyun boyunca güncellenir',
        definition:
          'Program çalışırken bilgisayarın belleğinde veri saklamak için ayrılan ve değeri sonradan güncellenebilen isimlendirilmiş alandır.',
        example: 'Bir oyunda oyuncunun topladığı altın miktarını tutan "Puan" değişkeni.',
      },
      {
        id: 'u5-fc4',
        term: 'Sabit (Constant)',
        hint: 'Program boyunca hiç değişmeyen veri',
        definition:
          'Tanımlandığı andan program bitene kadar taşıdığı değer hiçbir şekilde değiştirilmeyen veri türüdür.',
        example: 'Bir geometrik hesaplamada Pi sayısını 3.14 olarak veya haftanın gün sayısını 7 olarak tanımlamak.',
      },
      {
        id: 'u5-fc5',
        term: 'Koşul Yapısı (Eğer - Değilse)',
        hint: 'Şarta göre farklı yol seçme',
        definition:
          'Programın belirli bir şartın doğru ya da yanlış olmasına göre farklı komutları çalıştırmasını sağlayan karar yapısıdır.',
        example: 'Eğer hava yağmurluysa şemsiye al, değilse güneş gözlüğü tak.',
      },
      {
        id: 'u5-fc6',
        term: 'Döngü (Loop)',
        hint: 'Tekrarlayan işleri tek blokta toplar',
        definition:
          'Belirli komutların belirtilen sayıda ya da bir şart sağlandığı sürece arka arkaya tekrarlanmasını sağlayan kodlama yapısıdır.',
        example: 'Bir müzik parçasının nakaratını 3 kez çalmak veya merdiven basamaklarını en üste kadar tırmanmak.',
      },
    ],
    quiz: [
      {
        id: 'u5-q1',
        question:
          'Akış şemalarında "Başla" ve "Bitir" adımlarını göstermek için hangi geometrik şekil kullanılır?',
        options: ['Dikdörtgen', 'Elips (Oval)', 'Baklava Dilimi', 'Paralelkenar'],
        correctIndex: 1,
        explanation:
          'Standart akış şeması kurallarına göre algoritmanın başlangıcı ve bitişi her zaman Elips (Oval) sembolü ile gösterilir.',
      },
      {
        id: 'u5-q2',
        question:
          'Bir akış şemasında "Sayı 0’dan büyük mü?" gibi Evet/Hayır yanıtlı bir karar sorusu hangi şeklin içine yazılır?',
        options: [
          'Baklava Dilimi (Eşkenar Dörtgen)',
          'Elips',
          'Dikdörtgen',
          'Daire',
        ],
        correctIndex: 0,
        explanation:
          'Karar ve karşılaştırma işlemleri akış şemasında Baklava Dilimi (eşkenar dörtgen) ile gösterilir.',
      },
      {
        id: 'u5-q3',
        question:
          'Bir oyunda oyuncunun her elmayı yediğinde 10 artan "Skor" değeri programlamada neye örnektir?',
        options: ['Sabit', 'Değişken', 'Akış Oku', 'Donanım'],
        correctIndex: 1,
        explanation:
          'Program çalışırken değeri sürekli güncellenebilen veriler Değişken olarak tanımlanır.',
      },
      {
        id: 'u5-q4',
        question:
          'Bir robotun ileri gidip sağa dönme hareketini tam olarak 4 kez yapmasını sağlayan en pratik kodlama yapısı hangisidir?',
        options: [
          'Sabit tanımlama',
          'Döngü (Tekrarla) yapısı',
          'Veri girişi',
          'Yazı biçimlendirme',
        ],
        correctIndex: 1,
        explanation:
          'Aynı komutları birden fazla kez tekrarlamak için Döngü (Loop) yapısı kullanılır.',
      },
      {
        id: 'u5-q5',
        question:
          'Aşağıdakilerden hangisi bir algoritmanın sahip olması gereken temel özelliklerden biri DEĞİLDİR?',
        options: [
          'Adımların net ve anlaşılır olması',
          'Belirli bir başlangıç ve bitişinin olması',
          'Adımların sırasının rastgele değiştirilebilmesi',
          'Problemi doğru sonuca ulaştırması',
        ],
        correctIndex: 2,
        explanation:
          'Algoritmada adımların sırası çok önemlidir; adımların sırası karıştırılırsa program hatalı sonuç üretir veya hiç çalışmaz.',
      },
    ],
    tutorStarters: [
      'Algoritma ile akış şeması arasındaki fark nedir?',
      'Sabit ve değişken kavramlarını bir oyun örneğiyle anlatır mısın?',
      'Eğer-Değilse (If-Else) karar yapısını günlük hayattan nasıl örnekleriz?',
    ],
  },
];
