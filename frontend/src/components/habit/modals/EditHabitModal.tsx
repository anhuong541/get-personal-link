import { memo, useEffect } from 'react'

import isEqual from 'lodash/isEqual'
import { useForm } from 'react-hook-form'
import { useToggle } from 'react-toggle-management'

import { cn } from '@/utils'

import FormInput from '@/components/common/form/FormInput'
import FormTextarea from '@/components/common/form/FormTextarea'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useHabitsContext } from '@/contexts/HabitsContext'
import { firebastDataFormat } from '@/lib/dayjs'
import { useMutationDeleteHabit, useMutationEditHabit } from '@/lib/react-query/queryActions'

import { HABIT_COLORS } from '../constants/configs'
import toggleKeys from '../constants/toggleKeys'

const formKeys = ['label', 'description', 'goal', 'color']
type FormKeys = 'label' | 'description' | 'goal' | 'color'

const EditHabitModal = () => {
  const { isOpen, open: onOpen, close: onClose } = useToggle(toggleKeys.editHabitModal)

  const { habitIndex, habits, setHabits } = useHabitsContext()
  const { mutateAsync: deleteHabit } = useMutationDeleteHabit()
  const { mutateAsync: editHabit } = useMutationEditHabit()

  const form = useForm({
    defaultValues: {
      label: '',
      description: '',
      goal: 1,
      color: HABIT_COLORS[0]
    }
  })

  const { getValues, setValue } = form

  const handleEditHabit = () => {
    if (habitIndex === null) return

    const editNewHabitForm = {
      ...getValues(),
      order: habits[habitIndex].order,
      tag: '',
      category: [''],
      id: habits[habitIndex].id,
      created_at: habits[habitIndex].created_at,
      updated_at: firebastDataFormat(new Date())
    }

    console.log({ editNewHabitForm })

    if (isEqual(editNewHabitForm, habits[habitIndex])) {
      onClose()
      return
    }
    editHabit(
      { habit: editNewHabitForm, habitId: habits[habitIndex].id },
      {
        onSuccess: () => {
          setHabits(prev => {
            prev[habitIndex] = { ...editNewHabitForm }
            return [...prev]
          })
          onClose()
        }
      }
    )
  }

  const handleDeleteHabit = async () => {
    if (!habitIndex) return
    await deleteHabit(habits[habitIndex].id, {
      onSuccess: () => {
        setHabits(prev => {
          prev.splice(habitIndex, 1)
          return [...prev]
        })
        onClose()
      }
    })
  }

  useEffect(() => {
    if ((habitIndex || habitIndex === 0) && isOpen) {
      formKeys.forEach(value => {
        const name = value as FormKeys
        setValue(name, habits[habitIndex][name])
      })
    }
  }, [habitIndex, habits, isOpen, setValue])

  if (habitIndex !== null && habits?.[habitIndex]) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={open => (open ? onOpen() : onClose())}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Habit</DialogTitle>
            <DialogDescription>Create your new habit here!</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-6">
              <FormInput
                control={form.control}
                name="label"
                title="Habit Title"
                placeholder="Enter habit title"
              />

              <FormTextarea
                control={form.control}
                name="description"
                title="Description"
                placeholder="Enter a description (optional)"
                className="resize-none"
              />

              <FormInput
                control={form.control}
                name="goal"
                title="Monthly Goal"
                placeholder="Range From 1 to 31"
                type="number"
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Colors</FormLabel>
                    <FormControl>
                      <div className="mt-1 flex flex-wrap gap-2 rounded-md">
                        {HABIT_COLORS.map(color => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => field.onChange(color)}
                            className={cn(
                              'w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
                              field.value === color && 'ring-2 ring-offset-2 ring-ring'
                            )}
                            style={{ backgroundColor: color }}
                            aria-label={`Select color ${color}`}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={handleDeleteHabit}
            >
              Delete Habit
            </Button>
            <div className="justify-end flex space-x-2 items-center">
              <Button
                variant="outline"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleEditHabit}
              >
                Edit Habit
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
}

export default memo(EditHabitModal)
