import OptimizedImage from "@/components/ui/OptimizedImage";

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
        className="font-heading flex h-[41px] w-auto cursor-pointer items-center justify-center gap-[6px] rounded-[60px] border-0 bg-[#195236] px-6 text-sm font-medium text-[#F2F7F1] transition-all duration-300 select-none hover:bg-[#153e28] active:scale-95 disabled:pointer-events-none disabled:opacity-85 xl:h-[46px] xl:gap-[10px] xl:px-8 xl:text-base"
      >
        <span className="font-medium">Load More</span>
        {isLoading && (
          <span className="flex h-4 w-4 items-center justify-center xl:h-5 xl:w-5">
            <OptimizedImage
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
