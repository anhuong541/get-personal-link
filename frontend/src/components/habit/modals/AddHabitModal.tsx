import { useEffect } from 'react'

import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useToggle } from 'react-toggle-management'

import { cn, toKebabCase } from '@/utils'

import FormInput from '@/components/common/form/FormInput'
import FormTextarea from '@/components/common/form/FormTextarea'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
import { useMutationAddNewHabit } from '@/lib/react-query/queryActions'

import { HABIT_COLORS } from '../constants/configs'
import toggleKeys from '../constants/toggleKeys'

const defaultHabitValue = {
  label: '',
  description: '',
  goal: 1,
  color: HABIT_COLORS[0]
}

const AddHabitModal = () => {
  const { habits, setHabits } = useHabitsContext()
  const { mutateAsync: addNewHabit } = useMutationAddNewHabit()
  const {
    isOpen,
    open: openAddHabitModal,
    close: closeAddHabitModal
  } = useToggle(toggleKeys.addHabitModal)

  const form = useForm({
    defaultValues: defaultHabitValue
  })

  const { getValues, reset, control } = form

  const handleAddHabit = () => {
    const newHabitForm = {
      ...getValues(),
      tag: '',
      category: [],
      order: habits.length + 1
    }

    addNewHabit(newHabitForm, {
      onSuccess: () => {
        const habitId = toKebabCase(newHabitForm.label)
        setHabits(prev => {
          prev.push({
            ...newHabitForm,
            id: habitId,
            goal: Number(newHabitForm.goal),
            created_at: firebastDataFormat(new Date()),
            updated_at: firebastDataFormat(new Date())
          })
          return [...prev]
        })
        closeAddHabitModal()
      }
    })
  }

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => (open ? openAddHabitModal() : closeAddHabitModal())}
    >
      <DialogTrigger asChild>
        <Button className="bg-primary">
          <Plus className="h-4 w-4" /> New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogDescription>Create your new habit here!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            <FormInput
              control={control}
              name="label"
              title="Habit Title"
              placeholder="Enter habit title"
            />

            <FormTextarea
              control={control}
              name="description"
              title="Description"
              placeholder="Enter a description (optional)"
              className="resize-none"
            />

            <FormInput
              control={control}
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
            variant="ghost"
            onClick={() => closeAddHabitModal()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleAddHabit}
          >
            Add Habit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddHabitModal
