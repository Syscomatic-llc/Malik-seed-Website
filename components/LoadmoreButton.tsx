import Image from "next/image";

interface LoadmoreButtonProps {
  handleLoadMore: () => void;
  isLoading: boolean;
}

export default function LoadmoreButton({
  handleLoadMore,
  isLoading,
}: LoadmoreButtonProps) {
  return (
    <div className="mt-4 flex w-full justify-center">
      <button
        onClick={handleLoadMore}
        disabled={isLoading}
        aria-busy={isLoading}
        className="font-heading flex h-[41px] w-[118px] cursor-pointer items-center justify-center gap-[6px] rounded-[60px] border-0 bg-[#195236] px-4 text-sm font-medium text-[#F2F7F1] transition-all duration-200 select-none hover:bg-[#153e28] active:scale-95 disabled:pointer-events-none disabled:opacity-85 xl:h-[46px] xl:w-[154px] xl:gap-[10px] xl:px-6 xl:text-base"
      >
        <span className="font-medium">Load More</span>
        {isLoading && (
          <span className="flex h-4 w-4 items-center justify-center xl:h-5 xl:w-5">
            <Image
              src="/loading.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="animate-spin"
            />
          </span>
        )}
      </button>
    </div>
  );
}