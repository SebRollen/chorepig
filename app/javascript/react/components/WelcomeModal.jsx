import React from "react";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function WelcomeModal() {
  const [open, setOpen] = useState(!localStorage.getItem("chorepig-dismissed-welcome-modal"));

  function dismiss() {
    localStorage.setItem("chorepig-dismissed-welcome-modal", true);
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                      Welcome to <span className="text-pink-400 font-display text-lg">Chore Pig</span>
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-500">
                      <p className="my-1.5">To-do lists are a great way to keep track of what needs doing, but many modern apps heavily gamify the proces with streaks, experience points and daily productivity goals.</p>
                      <p className="my-1.5">Rather than being a tool for remembering your tasks, checking off boxes becomes a task in itself.</p>
                      <p className="my-1.5">Chore Pig is a no-frills to-do list application that helps you get things done while respecting your humanity and without vying for your attention.</p>
                      <p className="my-1.5 font-bold">Features:</p>
                      <details>
                        <summary className="font-medium">Progressive Web Application (PWA)</summary>
                        <div className="flex flex-col gap-y-1 text-xs ml-3">
                          <p>Chore Pig is a PWA, meaning you can install it as an application on your smartphone or tablet.</p>
                          <p>You can of course also access it through your browser like a normal website.</p>
                        </div>
                      </details>
                      <details>
                        <summary className="font-medium">Offline support</summary>
                        <div className="text-xs ml-3">
                          <p>Chore Pig works even when your device is offline. Continue creating and completing tasks like you normally would, and we'll sync your progress next time you reconnect.</p>
                        </div>
                      </details>
                      <details>
                        <summary className="font-medium">No signup required</summary>
                        <div className="flex flex-col gap-y-1 text-xs ml-3">
                          <p>You don't have to sign up or give us any information to start using Chore Pig. In fact, we've already created an anonymous account for you to use right now!</p>
                          <p>Your data is associated with your device and browser. If you want to sync your tasks across devices, you can <a className="font-bold underline" href="/users/sign_up">sign up for an account</a> for a one-time fee of USD 10.</p>
                        </div>
                      </details>
                      <details>
                        <summary className="font-medium">Half our profits go straight to the hogs.</summary>
                        <div className="text-xs ml-3">
                          <p>And other animals, too! We donate 50% of our profits to <a className="font-bold underline" href="https://thehumaneleague.org/" target="_blank">The Humane League</a></p>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button onClick={dismiss} type="button" className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Oink, oink</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default WelcomeModal;
