import {
  getGuildMemberChanges,
  getNewMembersDetails,
} from "@/api/members/fetch";

const TestButton = () => {
  async function handleTest() {
    const memberChanges = await getGuildMemberChanges({
      guildName: "이브",
      worldName: "루나",
    });

    console.log("길드 정보:", memberChanges.guildInfo);
    console.log("새로 추가된 멤버:", memberChanges.newMembers);
    console.log("탈퇴한 멤버:", memberChanges.leftMembers);
    console.log("변경사항 요약:", memberChanges.summary);

    // 새 멤버들의 상세 정보가 필요한 경우
    if (memberChanges.newMembers.length > 0) {
      const newMembersDetails = await getNewMembersDetails(
        memberChanges.newMembers,
      );
      console.log("새 멤버 상세 정보:", newMembersDetails);
    }
  }

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      onClick={handleTest}
    >
      test
    </button>
  );
};

export default TestButton;
