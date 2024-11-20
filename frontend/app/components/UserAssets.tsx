export function UserAssets(){
    return <div class="flex flex-col">
    <div class="flex flex-col overflow-hidden rounded-lg bg-baseBackgroundL1">
      <div class="flex items-center justify-between flex-row p-4">
        <div class="flex flex-row items-center justify-center space-x-2">
          <div
            class="flex flex-col justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextMedEmphasis px-3"
          >
            My Assets
          </div>
          <div
            class="flex flex-col justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextMedEmphasis px-3"
          >
            <div class="flex flex-row items-center">Open Orders</div>
          </div>
          <div
            class="flex flex-col justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextMedEmphasis px-3"
          >
            Fill History
          </div>
          <div
            class="flex flex-col justify-center cursor-pointer rounded-lg py-1 text-sm font-medium outline-none hover:opacity-90 h-[32px] text-baseTextHighEmphasis px-3 bg-baseBackgroundL2"
          >
            Order History
          </div>
        </div>
      </div>
      <div class="thin-scroll h-full overflow-auto">
        <div class="flex flex-col h-full min-h-[300px] p-4 pt-0">
          <div class="flex flex-col flex-1">
            <div class="flex flex-1">
              <div
                class="flex flex-col items-center justify-center flex-1 gap-6 rounded-xl bg-baseBackgroundL2 py-12"
              >
                <span class="pb-[16px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-activity text-baseIcon"
                  >
                    <path
                      d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                    ></path>
                  </svg>
                </span>
                <p class="text-xl font-semibold text-baseTextHighEmphasis/90">
                  No order history
                </p>
                <div class="font-medium text-baseTextMedEmphasis">
                  Trade, place orders, and manage your funds for activity to
                  appear here.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-1"></div>
  </div>
  
}