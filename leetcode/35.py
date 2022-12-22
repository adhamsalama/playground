class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        start = 0
        end = len(nums) - 1
        while start < end:
            middle = (start + end) // 2
            if nums[middle] == target:
                return middle
            elif nums[middle] > target:
                end = middle - 1
            else:
                start = middle + 1
        if start == end:
            if nums[start] >= target:
                return start
            else: return start + 1
        else:
            if nums[middle] != target:
                return middle
            else: return middle + 1
        