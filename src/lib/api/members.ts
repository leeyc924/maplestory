import { getCharacterBasic, getCharacterOcid } from "@/lib/api/maple";
import { supabase } from "@/lib/supabase";
import type {
  CreateMemberInput,
  Member,
  UpdateMemberInput,
} from "@/types/member";

export async function getMembers(): Promise<Member[]> {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("joined_at", { ascending: false });

    if (error) throw error;

    return (data || []) as Member[];
  } catch (error) {
    console.error("Failed to get members:", error);
    return [];
  }
}

export async function getMember(id: string): Promise<Member | null> {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Member;
  } catch (error) {
    console.error("Failed to get member:", error);
    return null;
  }
}

export async function createMember(
  input: CreateMemberInput,
): Promise<Member | null> {
  try {
    const ocid = await getCharacterOcid(input.character_name);
    if (!ocid) {
      throw new Error("캐릭터를 찾을 수 없습니다");
    }

    const basic = await getCharacterBasic(ocid);
    if (!basic) {
      throw new Error("캐릭터 정보를 가져올 수 없습니다");
    }

    const { data, error } = await supabase
      .from("members")
      .insert([
        {
          ocid,
          character_name: basic.character_name,
          character_class: basic.character_class,
          character_level: basic.character_level,
          character_image: basic.character_image,
          world_name: basic.world_name,
          guild_name: basic.character_guild_name,
          joined_at: input.joined_at,
          previous_guild: input.previous_guild || null,
          position: input.position || "길드원",
          note: input.note || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return data as Member;
  } catch (error) {
    console.error("Failed to create member:", error);
    return null;
  }
}

export async function updateMember(
  id: string,
  input: UpdateMemberInput,
): Promise<Member | null> {
  try {
    const { data, error } = await supabase
      .from("members")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Member;
  } catch (error) {
    console.error("Failed to update member:", error);
    return null;
  }
}

export async function deleteMember(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Failed to delete member:", error);
    return false;
  }
}

export async function syncMemberData(id: string): Promise<Member | null> {
  try {
    const member = await getMember(id);
    if (!member) return null;

    const basic = await getCharacterBasic(member.ocid);
    if (!basic) return null;

    const { data, error } = await supabase
      .from("members")
      .update({
        character_class: basic.character_class,
        character_level: basic.character_level,
        character_image: basic.character_image,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Member;
  } catch (error) {
    console.error("Failed to sync member data:", error);
    return null;
  }
}
