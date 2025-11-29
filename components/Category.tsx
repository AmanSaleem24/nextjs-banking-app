import Image from "next/image";

import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";

const Category = ({ category }: CategoryProps) => {
  const {
    bg,
    circleBg,
    text: { main, count },
    progress: { bg: progressBg, indicator },
    icon,
  } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
  topCategoryStyles.default;

  // Hardcoded budget for top 3 categories
  const budgetAmount = 3000;
  
  // Calculate spent amount based on transaction count ratio
  const estimatedSpent = (category.count / category.totalCount) * budgetAmount;
  
  const remainingAmount = Math.max(0, budgetAmount - estimatedSpent);
  const progressPercentage = (estimatedSpent / budgetAmount) * 100;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
      <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
          <h2 className={cn("font-medium", main)}>
            {category.name.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
          <h3 className={cn("font-normal", count)}>
            {formatCurrency(remainingAmount)} left
          </h3>
        </div>
        <Progress
          value={progressPercentage}
          className={cn("h-2 w-full", progressBg)}
          indicatorClassName={cn("h-2 w-full", indicator)}
        />
      </div>
    </div>
  );
};

export default Category;