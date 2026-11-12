import { MessageCircle, Printer } from 'lucide-react'

import { Button, List, ListItem, SectionTitle, buttonClassName } from '@/components/shared'
import { notify } from '@/lib/toast'
import type { WelcomeShare } from '../types'
import { printWelcomeSheet, whatsappTo } from '../utils/welcome'
import { formatPhone } from '@/lib/phone'

function print(people: WelcomeShare[]) {
  try {
    printWelcomeSheet('Your ADC Support Group link', people)
  } catch (error) {
    notify((error as Error).message, 'error')
  }
}

/** New people with no email and no SMS points: the leader sends each their link. */
export function WelcomeShareList({ people }: { people: WelcomeShare[] }) {
  if (!people.length) return null
  return (
    <section>
      <SectionTitle title="Send these people their link" action={<Button variant="ghost" size="sm" icon={Printer} onClick={() => print(people)}>Print sheet</Button>} />
      <p className="faint small mb-3">They have no email and you have no SMS points, so nobody has told them yet.</p>
      <List>
        {people.map((person) => (
          <ListItem
            key={person.phone}
            title={person.fullName}
            meta={formatPhone(person.phone)}
            trailing={(
              <a className={buttonClassName('secondary', 'sm')} href={whatsappTo(person)} target="_blank" rel="noreferrer">
                <MessageCircle className="i" aria-hidden />WhatsApp
              </a>
            )}
          />
        ))}
      </List>
    </section>
  )
}
