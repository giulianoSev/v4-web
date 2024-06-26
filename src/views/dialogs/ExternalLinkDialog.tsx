import type { ReactNode } from 'react';

import styled from 'styled-components';

import { ButtonAction, ButtonType } from '@/constants/buttons';
import { STRING_KEYS } from '@/constants/localization';

import { useStringGetter } from '@/hooks/useStringGetter';

import { layoutMixins } from '@/styles/layoutMixins';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';

type ElementProps = {
  buttonText?: ReactNode;
  link: string;
  linkDescription?: string;
  title?: ReactNode;
  slotContent?: ReactNode;
  setIsOpen: (open: boolean) => void;
};

export const ExternalLinkDialog = ({
  setIsOpen,
  buttonText,
  link,
  linkDescription,
  title,
  slotContent,
}: ElementProps) => {
  const stringGetter = useStringGetter();
  return (
    <Dialog
      isOpen
      setIsOpen={setIsOpen}
      title={title ?? stringGetter({ key: STRING_KEYS.LEAVING_WEBSITE })}
      description={
        linkDescription ?? stringGetter({ key: STRING_KEYS.LEAVING_WEBSITE_DESCRIPTION })
      }
    >
      <$Content>
        {slotContent}
        <p>{stringGetter({ key: STRING_KEYS.LEAVING_WEBSITE_DISCLAIMER })}.</p>
        <Button type={ButtonType.Link} action={ButtonAction.Primary} href={link}>
          {buttonText ?? stringGetter({ key: STRING_KEYS.CONTINUE })}
        </Button>
      </$Content>
    </Dialog>
  );
};
const $Content = styled.div`
  ${layoutMixins.flexColumn}
  gap: 1rem;

  font: var(--font-base-book);
`;
