nums=[99,44,6,2,1,5,63,87,283,4,0]
def bubleSort(nums):
    for j in range(len(nums)):
        for i in range(len(nums)-1):
            if nums[i]>nums[i+1]:
                nums[i],nums[i+1]=nums[i+1],nums[i]
    return nums
print(bubleSort(nums))

def selectionsort(nums):
    for i in range(len(nums)):
        minNum=i
        for j in range(i+1,len(nums)):
            if nums[j]<nums[minNum]:
                nums[i],minNum=minNum,nums[j]
    return nums
print(selectionsort(nums))


def insertionsort(arr):
    for i in range(1,len(arr)):
        key=arr[i]
        j=i-1
        while j>0 and key<arr[j]:
            arr[j+1]=arr[j]
            j-=1
        arr[j+1]=key
    return arr
# o(n2)

# merge and quick o(nlogn)
def mergsort(arr):
    
    if len(arr) > 1:
        left_arr = arr[:len(arr)//2]
        right_arr = arr[len(arr)//2:]

        mergsort(left_arr)
        mergsort(right_arr)





        i = 0  # pointer for left_arr
        j = 0  # pointer for right_arr
        k = 0  # pointer for merged arr
        # Merge the two halves
        while i < len(left_arr) and j < len(right_arr):
            if left_arr[i] < right_arr[j]:
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                j += 1
            k += 1

        # Add any remaining elements from left_arr
        while i < len(left_arr):
            arr[k] = left_arr[i]
            i += 1
            k += 1

        # Add any remaining elements from right_arr
        while j < len(right_arr):
            arr[k] = right_arr[j]
            j += 1
            k += 1

    return arr  # Need to return arr at the end!

# Test it
nums = [5, 3, 8, 2, 7, 1, 4]
print(mergsort(nums))


print(mergsort(nums))
