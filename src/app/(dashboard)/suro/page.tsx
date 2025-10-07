import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuroPage() {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div
        className={cn(
          "glass-effect rounded-xl md:rounded-2xl",
          "p-4 md:p-6 shadow-2xl",
        )}
      >
        <h2
          className={cn(
            "text-xl md:text-2xl font-bold text-white",
            "mb-4 md:mb-6 flex items-center gap-2 md:gap-3",
          )}
        >
          <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-green-300" />
          수로 현황
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div
            className={cn(
              "bg-gradient-to-br from-green-500/20",
              "to-blue-500/20 backdrop-blur-sm",
              "rounded-lg md:rounded-xl p-4 md:p-5",
              "border border-white/10",
            )}
          >
            <h3
              className={cn(
                "text-lg md:text-xl font-semibold",
                "text-white mb-3 md:mb-4",
              )}
            >
              주간 수로
            </h3>
            <div className="space-y-3">
              {[
                {
                  cleared: 45,
                  color: "green",
                  name: "노말 스우",
                  total: 45,
                },
                {
                  cleared: 38,
                  color: "yellow",
                  name: "하드 스우",
                  total: 45,
                },
                {
                  cleared: 12,
                  color: "orange",
                  name: "익스 스우",
                  total: 30,
                },
              ].map((boss) => (
                <div className="space-y-2" key={boss.name}>
                  <div
                    className={cn(
                      "flex justify-between text-white",
                      "text-sm md:text-base",
                    )}
                  >
                    <span className="font-medium">{boss.name}</span>
                    <span className="text-xs md:text-sm">
                      {boss.cleared} / {boss.total}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-2.5 md:h-3 bg-black/30",
                      "rounded-full overflow-hidden",
                    )}
                  >
                    <div
                      className={cn(
                        "h-full bg-gradient-to-r",
                        "transition-all duration-500",
                        boss.color === "green"
                          ? "from-green-400 to-green-600"
                          : boss.color === "yellow"
                            ? "from-yellow-400 to-orange-500"
                            : "from-orange-400 to-red-500",
                      )}
                      style={{
                        width: `${(boss.cleared / boss.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "bg-gradient-to-br from-purple-500/20",
              "to-pink-500/20 backdrop-blur-sm",
              "rounded-lg md:rounded-xl p-4 md:p-5",
              "border border-white/10",
            )}
          >
            <h3
              className={cn(
                "text-lg md:text-xl font-semibold",
                "text-white mb-3 md:mb-4",
              )}
            >
              일일 수로
            </h3>
            <div className="space-y-3">
              {[
                {
                  cleared: 42,
                  color: "green",
                  name: "자쿰",
                  total: 45,
                },
                {
                  cleared: 35,
                  color: "yellow",
                  name: "핑크빈",
                  total: 45,
                },
                {
                  cleared: 28,
                  color: "orange",
                  name: "파풀라투스",
                  total: 45,
                },
              ].map((boss) => (
                <div className="space-y-2" key={boss.name}>
                  <div
                    className={cn(
                      "flex justify-between text-white",
                      "text-sm md:text-base",
                    )}
                  >
                    <span className="font-medium">{boss.name}</span>
                    <span className="text-xs md:text-sm">
                      {boss.cleared} / {boss.total}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-2.5 md:h-3 bg-black/30",
                      "rounded-full overflow-hidden",
                    )}
                  >
                    <div
                      className={cn(
                        "h-full bg-gradient-to-r",
                        "transition-all duration-500",
                        boss.color === "green"
                          ? "from-green-400 to-green-600"
                          : boss.color === "yellow"
                            ? "from-yellow-400 to-orange-500"
                            : "from-orange-400 to-red-500",
                      )}
                      style={{
                        width: `${(boss.cleared / boss.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-4 md:mt-6 bg-gradient-to-br",
            "from-indigo-500/20 to-blue-500/20",
            "backdrop-blur-sm rounded-lg md:rounded-xl",
            "p-4 md:p-5 border border-white/10",
          )}
        >
          <h3
            className={cn(
              "text-lg md:text-xl font-semibold",
              "text-white mb-3 md:mb-4",
            )}
          >
            최근 수로 기록
          </h3>
          <div className="space-y-2">
            {[
              { boss: "하드 스우", member: "길드원1", time: "3분 전" },
              {
                boss: "익스 스우",
                member: "길드원2",
                time: "15분 전",
              },
              {
                boss: "노말 스우",
                member: "길드원3",
                time: "1시간 전",
              },
              { boss: "자쿰", member: "길드원4", time: "2시간 전" },
            ].map((record) => (
              <div
                className={cn(
                  "flex flex-col sm:flex-row",
                  "sm:justify-between sm:items-center",
                  "bg-black/20 rounded-lg px-3 md:px-4",
                  "py-2.5 md:py-3 hover:bg-black/30",
                  "transition-colors gap-1 sm:gap-2",
                )}
                key={`${record.member}-${record.boss}-${record.time}`}
              >
                <div
                  className={cn("flex items-center gap-2 md:gap-3", "min-w-0")}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full bg-green-400",
                      "animate-pulse flex-shrink-0",
                    )}
                  />
                  <span
                    className={cn(
                      "text-white font-medium",
                      "text-sm md:text-base truncate",
                    )}
                  >
                    {record.member}
                  </span>
                  <span
                    className={cn(
                      "text-gray-300 text-xs md:text-sm",
                      "hidden sm:inline",
                    )}
                  >
                    클리어
                  </span>
                  <span
                    className={cn(
                      "text-yellow-300 text-xs md:text-sm",
                      "truncate",
                    )}
                  >
                    {record.boss}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-gray-400 text-xs md:text-sm",
                    "ml-6 sm:ml-0",
                  )}
                >
                  {record.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
