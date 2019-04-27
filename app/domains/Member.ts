type Member =
  | "chika"
  | "riko"
  | "kanan"
  | "dia"
  | "you"
  | "yoshiko"
  | "hanamaru"
  | "mari"
  | "ruby";

interface MemberDetail {
  name: string;
  icon: string;
  color: string;
}

const from = (name: string) => {
  for (const member of Object.keys(MEMBERS) as Member[]) {
    if (MEMBERS[member].name === name) {
      return member;
    }
  }

  throw new Error(`no member found. provided name: ${name}`);
};

/**
 * 色の参考: http://otonoki-live.com/lovelive/sunshine/183/
 */
const MEMBERS: { [K in Member]: MemberDetail } = {
  chika: {
    name: "高海千歌",
    color: "#ffa500",
    icon: `🍊`
  },
  riko: {
    name: "桜内梨子",
    color: "#ffdbed",
    icon: `🎹`
  },
  kanan: {
    name: "松浦果南",
    color: "#00afcc",
    icon: `🐬`
  },
  dia: {
    name: "黒澤ダイヤ",
    color: "#ff0000",
    icon: `🌺`
  },
  you: {
    name: "渡辺曜",
    color: "#add8e6",
    icon: `🚢`
  },
  yoshiko: {
    name: "津島善子",
    color: "#ffffff",
    icon: `👿`
  },
  hanamaru: {
    name: "国木田花丸",
    color: "#ffff00",
    icon: `💮`
  },
  mari: {
    name: "小原鞠莉",
    color: "#800080",
    icon: `✨`
  },
  ruby: {
    name: "黒澤ルビィ",
    color: "#ffc0cb",
    icon: `🍭`
  }
};

export { Member, MEMBERS, MemberDetail, from };
