CREATE TABLE guild_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ocid TEXT UNIQUE NOT NULL,
  character_name TEXT NOT NULL,
  character_class TEXT NOT NULL,
  character_level INTEGER NOT NULL,
  character_image TEXT,
  guild_name TEXT DEFAULT '이브',
  joined_at DATE NOT NULL,
  previous_guild TEXT,
  permission TEXT DEFAULT '길드원',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  access_flag TEXT,
);

INSERT INTO guild_members (
  ocid,
  character_name,
  character_class,
  character_level,
  character_image,
  guild_name,
  joined_at,
  permission,
  access_flag,
  note
) VALUES (
  '76e5ad3aa491d06bf550e0141580d949',
  '반희반희',
  '아크메이지(불,독)',
  290,
  'https://open.api.nexon.com/static/maplestory/character/look/GFMJIMGGICAOEKCILNHCFEOIFIEHEDBJBGHJCBOIHKOOINBCPFGFICFDAAHKHEKAEAKMDNPGCKLPELAIDMGJCDOLMLGJPHKGGDGGMBHMPBNFHLNEFCINGHKHPILGGBGDBOEPKGGGHABMFGALGBJMIJCDPJPOGBPBKNIMMGIALEGBCOEMDPJCKGOBAOLAHLEDBOPNOBMEBABNBNNFMPAOEGMGPKMJFOBDJBICCEIDBDIEIJJHIEPBLCDIGLGOKFEI',
  '이브',
  '2025-10-07',
  '길드원',
  'true',
  ''
);