import { Button } from '@/components/ui/button';
import {
  SignInButton,

} from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <SignInButton>Button</SignInButton>
    </div>
  );
}
