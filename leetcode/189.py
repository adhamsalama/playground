class Solution:
    def rotate(self, nums: list[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        result = []
        k = k % len(nums)
        if len(nums) == 1 or k == 0:
            return
        for i in list(range(len(nums)-k, len(nums))):
            result.append(nums[i])
        print(result)
        for i in range(0, len(nums)-k):
            result.append(nums[i])
        print(result)
        for i in range(len(nums)):
            nums[i] = result[i]
sol = Solution()
a = [1,2,3,4,5,6]
sol.rotate(a, 1)
print(a)