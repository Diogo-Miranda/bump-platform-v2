import { redirect } from "next/navigation"
import { sessionHasGrant } from "@/app/lib/grants"
import type { Grant } from "@/app/lib/grants"

interface WithGrantOptions {
  /** Page to redirect to when the grant check fails. Defaults to "/not-authorized". */
  redirectTo?: string
}

type PageComponent<P> = (props: P) => React.ReactNode | Promise<React.ReactNode>

/**
 * Wraps a Next.js server page with a grant check.
 * If the session token does not contain the required grant, the user is
 * redirected to `options.redirectTo` (default: "/not-authorized").
 *
 * Usage:
 *   async function MyPage() { ... }
 *   export default withGrant("platform:fullAccess", MyPage)
 *
 * With custom redirect:
 *   export default withGrant("write", MyPage, { redirectTo: "/dashboard" })
 */
export function withGrant<P extends Record<string, unknown> = Record<string, unknown>>(
  grant: Grant,
  Page: PageComponent<P>,
  options: WithGrantOptions = {}
): PageComponent<P> {
  return async function GrantGuardedPage(props: P) {
    const allowed = await sessionHasGrant(grant)
    if (!allowed) redirect(options.redirectTo ?? "/not-authorized")
    return Page(props)
  }
}
