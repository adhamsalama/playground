class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        n = len(s)
        if n == 0:
            return 0
        cum = [0] * n
        sub = {}
        sub[0] = s[0]
        cum[0] = 1
        longest = 1
        for i in range(1, n):
            c = s[i]
            if c in sub[i - 1]:
                # sub[i] = c
                right = 0
                while sub[i - 1][right] != c:
                    right += 1
                sub[i] = sub[i - 1][right + 1 :] + c

                cum[i] = cum[i - 1] - right
            else:
                sub[i] = sub[i - 1] + c
                cum[i] = cum[i - 1] + 1
            current = cum[i]
            longest = current if current > longest else longest
        return longest


# ? chatGPT
class chatGTPSolution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # chatGPT
        start = 0
        max_length = 0
        seen: dict[str, int] = {}
        for end, c in enumerate(s):
            if c in seen and start <= seen[c]:
                start = seen[c] + 1
            else:
                max_length = max(max_length, end - start + 1)
            seen[c] = end
        return max_length
