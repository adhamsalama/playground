class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        nums: dict[int, int] = {}
        for i in range(len(numbers)):
            n = numbers[i]
            r = target - n
            if r in nums:
                return [nums[r] + 1, i + 1]
            nums[n] = i
        return []

sol = Solution()
print(sol.twoSum([0,0,3,4], 0))
