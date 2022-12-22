class Solution:
    def sortedSquares(self, nums: list[int]) -> list[int]:
        result: list[int] = [0] * len(nums)
        start = 0
        end = len(nums) - 1
        reverse_index = end
        while start <= end:
            i = abs(nums[start])
            j = abs(nums[end])
            if i > j:
                result[reverse_index] = i**2
                start += 1
            else:
                result[reverse_index] = j**2
                end -= 1
            reverse_index -= 1
        return result